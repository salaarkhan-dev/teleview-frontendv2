import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Button from "../components/Button";
import Member from "../components/Member";
import {
  selectorIsOwner,
  selectorIsLoading as TeamLoading,
} from "../features/teams/teamsSlice";
import {
  fetchMeetingDetailAsync,
  joinMember,
  leaveMember,
  selectorIsLoading,
  selectorMeetingMembers,
  selectorMeetingTitle,
  updateMember,
} from "../features/meeting/meetingSlice";
import { useHistory } from "react-router";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import cv, { INTER_AREA } from "@techstark/opencv-js";
import faceCascadeFile from "../assets/cascade/haarcascade_frontalface_default.xml";
import eyeCascadeFile from "../assets/cascade/haarcascade_eye.xml";
import axios from "axios";
import { SOCKET_URL } from "../api/endpoints";
import MeetingOwnerView from "./../components/MeetingOwnerView";
import CustomProgressBar from "./../components/CustomProgressBar";
import MeetingMemberView from "../components/MeetingMemberView";
import { useCallControls } from "@agnostech/react-agora-ng";

const Meeting = (props) => {
  const webcamRef = React.useRef(null);
  const client = React.useRef(null);
  const outRef = React.useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const slug = props.match.params.slug;
  const channelSlug = props.match.params.channelSlug;
  const meetingTitle = useSelector(selectorMeetingTitle);
  const meetingMembers = useSelector(selectorMeetingMembers);
  const meetingId = props.match.params.meetingId;
  const isOwner = useSelector(selectorIsOwner);
  const isLoading = useSelector(selectorIsLoading);
  const isTeamLoading = useSelector(TeamLoading);
  const token = localStorage.getItem("token").replace(/["]+/g, "");
  let time;
  let socketTimeout;

  async function fetchMeetingDetail(obj) {
    await dispatch(fetchMeetingDetailAsync(obj));
  }
  const { leaveCall } = useCallControls();

  const runDetector = async () => {
    await axios.get(faceCascadeFile).then((response) => {
      try {
        cv.FS_createDataFile(
          "/",
          "haarcascade_frontalface_default.xml",
          response.data,
          true,
          false,
          false
        );
      } catch (e) {
        console.log("fs error:" + e);
        window.location.reload();
      }
    });
    await axios.get(eyeCascadeFile).then((response) => {
      try {
        cv.FS_createDataFile(
          "/",
          "haarcascade_eye.xml",
          response.data,
          true,
          false,
          false
        );
      } catch (e) {
        console.log("fs error:" + e);
        window.location.reload();
      }
    });
    const expModel = await tf.loadLayersModel(
      "https://salaarkhan-dev.github.io/expression-detection/model.json"
    );
    const drowModel = await tf.loadLayersModel(
      "https://salaarkhan-dev.github.io/drowsiness-detection/model.json"
    );

    detectNew(expModel, drowModel);
  };

  const detectNew = async (expModel, drowModel) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      let src = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
      let cap = new cv.VideoCapture(video);
      let gray = new cv.Mat();
      let color = new cv.Mat();
      let grayFace = new cv.Mat();
      let colorEye = new cv.Mat();
      let faces = new cv.RectVector();
      let eyes = new cv.RectVector();
      let msize = new cv.Size(0, 0);
      let facesize = new cv.Size(48, 48);
      let eyesize = new cv.Size(224, 224);
      let faceCascade = new cv.CascadeClassifier();
      let eyesCascade = new cv.CascadeClassifier();
      const FPS = 30;
      let frame = 0;
      let score = 0;

      // load pre-trained classifiers

      faceCascade.load("haarcascade_frontalface_default.xml");
      eyesCascade.load("haarcascade_eye.xml");

      async function processVideo() {
        try {
          let begin = Date.now();
          let expression = "";
          // start processing.
          cap.read(src);
          cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
          faceCascade.detectMultiScale(gray, faces, 1.2, 5, 0, msize, msize);
          for (let i = 0; i < faces.size(); ++i) {
            let roiGray = gray.roi(faces.get(i));
            let roiColor = src.roi(faces.get(i));
            cv.resize(roiGray, grayFace, facesize, 0, 0, INTER_AREA);
            let croppedFace = tf.tensor(grayFace.data, [
              grayFace.rows,
              grayFace.cols,
              1,
            ]);
            // Normalize the image from [0, 255] to [0, 1].
            const offset = tf.scalar(255);
            const normalized = croppedFace.div(offset);

            // Reshape to a single-element batch so we can pass it to predict.
            const batched = normalized.expandDims(0);
            const pred = await expModel.predict(batched);
            const predictedEmotion = pred.argMax(1).dataSync()[0];
            switch (predictedEmotion) {
              case 0:
                console.log("angry");
                expression = "angry";
                break;
              case 1:
                console.log("disgust");
                expression = "disgust";
                break;
              case 2:
                console.log("fear");
                expression = "fear";
                break;
              case 3:
                console.log("happy");
                expression = "happy";
                break;
              case 4:
                console.log("sad");
                expression = "sad";
                break;
              case 5:
                console.log("surprise");
                expression = "surprise";
                break;
              case 6:
                console.log("neutral");
                expression = "neutral";
                break;
              default:
                expression = "neutral";
                break;
            }

            // detect eyes in face ROI
            eyesCascade.detectMultiScale(roiGray, eyes, 1.1, 4);
            for (let j = 0; j < eyes.size(); ++j) {
              let roiColorEye = roiColor.roi(eyes.get(i));
              cv.cvtColor(roiColorEye, color, cv.COLOR_RGBA2RGB);
              cv.resize(color, colorEye, eyesize, 0, 0, INTER_AREA);
              // cv.imshow(outRef.current, colorEye);
              let croppedFace = tf.tensor(colorEye.data, [
                colorEye.rows,
                colorEye.cols,
                3,
              ]);
              // Normalize the image from [0, 255] to [-1, 1].
              const offset = tf.scalar(255);
              const normalized = croppedFace.div(offset);

              // Reshape to a single-element batch so we can pass it to predict.
              const batched = normalized.expandDims(0);
              const pred = await drowModel.predict(batched).dataSync()[0];
              frame += 1;
              score += pred;
              if (frame === 15) {
                const performance = ((score / 15) * 100).toFixed(2);
                frame = 0;
                score = 0;
                client.current.send(
                  JSON.stringify({
                    type: "message",
                    command: "update_meeting_member",
                    channel: channelSlug,
                    slug: slug,
                    meetingId: meetingId,
                    performance: performance,
                    expression: expression,
                  })
                );
                if (performance > 45) {
                  console.log("attentive", performance + "%");
                } else {
                  console.log("drowsy", performance + "%");
                }
              }
              cv.imshow(outRef.current, roiColorEye);
              roiColorEye.delete();
            }
            roiGray.delete();
            roiColor.delete();
          }
          // schedule the next one.
          let delay = 1000 / FPS - (Date.now() - begin);
          time = setTimeout(processVideo, delay);
        } catch {
          time = setTimeout(processVideo, 0);
        }
      }

      // schedule the first one.
      time = setTimeout(processVideo, 0);
    }
  };

  function connectSockets() {
    client.current = new W3CWebSocket(SOCKET_URL + `/ws/post/${channelSlug}/`, [
      "Token",
      token,
    ]);
    client.current.onopen = () => {
      console.log("Websocket connected");
    };

    client.current.onclose = () => {
      console.log("Websocket closed, Retrying in 3 second.");
      socketTimeout = setTimeout(connectSockets, 3000);
    };
    client.current.onerror = () => {
      console.log("Websocket error.");
      client.current.close();
    };
  }

  React.useEffect(() => {
    fetchMeetingDetail({
      slug: slug,
      channelSlug: channelSlug,
      meetingId: meetingId,
    });

    connectSockets();
    runDetector();

    return () => {
      client.current.close();
      clearTimeout(time);
      clearTimeout(socketTimeout);
    };
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!client.current) return;

    client.current.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.command === "join_meeting") {
        if (dataFromServer.meeting) {
          console.log(dataFromServer.member);
          dispatch(joinMember(dataFromServer.member));
        } else {
          console.log(dataFromServer.error);
        }
      } else if (dataFromServer.command === "leave_meeting") {
        if (dataFromServer.leave) {
          dispatch(leaveMember(dataFromServer.members));
        } else {
          console.log(dataFromServer.error);
        }
      } else if (dataFromServer.command === "end_meeting") {
        if (dataFromServer.end) {
          console.log(dataFromServer.end);
          history.push(`/teams/${slug}/channels/${channelSlug}`);
        } else {
          console.log(dataFromServer);
        }
      } else if (dataFromServer.command === "update_meeting_member") {
        if (dataFromServer.updated) {
          console.log(dataFromServer);
          dispatch(updateMember(dataFromServer.updated_member));
        } else {
          console.log("error");
        }
      }
    };
    // eslint-disable-next-line
  }, []);

  const videoConstraints = {
    width: 520,
    height: 520,
    facingMode: "user",
  };

  const handleLeave = () => {
    leaveCall();
    client.current.send(
      JSON.stringify({
        type: "message",
        command: "leave_meeting",
        channel: channelSlug,
        slug: slug,
        meetingId: meetingId,
      })
    );
    history.push(`/teams/${slug}/channels/${channelSlug}`);
  };
  const handleEnd = () => {
    leaveCall();
    client.current.send(
      JSON.stringify({
        type: "message",
        command: "end_meeting",
        channel: channelSlug,
        slug: slug,
        meetingId: meetingId,
      })
    );
    // history.push(`/teams/${slug}/channels/${channelSlug}`);
  };

  return (
    <MeetingContainer>
      <Head>
        <Left>
          <span>
            {isTeamLoading ||
            meetingTitle === null ||
            typeof meetingTitle === "undefined" ? (
              <Skeleton animation="wave" width={200} />
            ) : (
              meetingTitle
            )}
          </span>
        </Left>
        <Right>
          {isOwner ? (
            <Button value="End Meeting" onClick={handleEnd} />
          ) : (
            <Button value="Leave Meeting" onClick={handleLeave} />
          )}
        </Right>
      </Head>
      <Body>
        <ChatArea isOwner={isOwner}>
          {!isOwner ? (
            <MeetingMemberViewContainer>
              <CustomWebcam
                audio={false}
                mirrored
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
              <MeetingMemberView channelSlug={channelSlug} />
            </MeetingMemberViewContainer>
          ) : (
            <MeetingOwnerView channelSlug={channelSlug} />
          )}
        </ChatArea>
        <MemberArea isOwner={isOwner}>
          <Top>
            <span>Member</span>
          </Top>
          <Bottom>
            <MeetingMembersContainer>
              <MeetingMembers>
                {isLoading || typeof meetingMembers === "undefined" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <CustomProgressBar
                      style={{ width: "15px", height: "15px" }}
                    />
                  </div>
                ) : meetingMembers.length ? (
                  meetingMembers.map((member, index) => {
                    return <Member meeting key={index} {...member} />;
                  })
                ) : null}
              </MeetingMembers>
            </MeetingMembersContainer>
          </Bottom>
        </MemberArea>
      </Body>
    </MeetingContainer>
  );
};

export default Meeting;

const MeetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  height: inherit;
  @media (max-width: 768px) {
    gap: 5px;
  }
  .page-title {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;
    width: 100%;
    opacity: 0.8;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const CustomWebcam = styled(Webcam)`
  height: 100px;
  width: 100px;
  border-radius: 5px;
  position: absolute;
  top: 5px;
  right: 0;
  z-index: 999;
  @media (max-width: 768px) {
    height: 80px;
    width: 80px;
  }
`;
const MeetingMemberViewContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 10px;
  position: relative;
  @media (max-width: 768px) {
    /* align-items: center; */
  }
`;
const Head = styled.div`
  flex: 0.1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
const Left = styled.div`
  height: 100%;
  flex: 0.5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;
    @media (max-width: 768px) {
      font-size: 18px;
    }
    @media (max-width: 480px) {
      font-size: 16px;
    }
  }
`;
const Right = styled.div`
  height: 100%;
  flex: 0.5;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  align-items: center;
`;

const Body = styled.div`
  flex: 0.9;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;
const ChatArea = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  padding: 0 15px 15px 15px;
  background: linear-gradient(
    180deg,
    rgba(51, 47, 103, 0.0549706) 2.1%,
    rgba(69, 65, 133, 0.169724) 57.45%,
    rgba(61, 60, 125, 0.0586787) 98.26%
  );
  box-shadow: 0px 48px 69px rgba(23, 18, 43, 0.8453);
  backdrop-filter: blur(15px);
  border-radius: 15px;

  @media (max-width: 768px) {
    box-shadow: 0px 48px 69px rgba(23, 18, 43, 0.4);
    flex: ${({ isOwner }) => (isOwner ? 0.2 : 0.7)};
  }
`;
const MemberArea = styled.div`
  flex: 0.2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px;
  background: linear-gradient(
    180deg,
    rgba(51, 47, 103, 0.0549706) 2.1%,
    rgba(69, 65, 133, 0.169724) 57.45%,
    rgba(61, 60, 125, 0.0586787) 98.26%
  );
  box-shadow: 0px 48px 69px rgba(23, 18, 43, 0.8453);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  @media (max-width: 768px) {
    flex: ${({ isOwner }) => (isOwner ? 0.7 : 0.2)};
  }
`;

const Top = styled.div`
  flex: 0.01;
  display: flex;
  justify-content: center;
  span {
    text-align: center;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    mix-blend-mode: normal;
    opacity: 0.9;
  }
`;
const Bottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MeetingMembersContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  margin-left: 5px;
`;
const MeetingMembers = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  span {
    text-align: center;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
  }
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
