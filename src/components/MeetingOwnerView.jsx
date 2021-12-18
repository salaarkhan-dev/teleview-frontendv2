import React from "react";
import styled from "styled-components";
import {
  useCallEvents,
  useJoinCall,
  useCallControls,
} from "@agnostech/react-agora-ng";
import { useDispatch } from "react-redux";
import { userJoin, userLeft } from "../features/meeting/meetingSlice";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";

const MeetingOwnerView = ({ channelSlug }) => {
  const { events } = useCallEvents();
  const dispatch = useDispatch();
  const [mute, setMute] = React.useState(false);
  const [video, setVideo] = React.useState(false);
  const [screenshare, setScreenshare] = React.useState(false);

  // join the call
  useJoinCall({
    channel: channelSlug,
    userId: null,
    token: null,
    localVideoDiv: "Test",
  });

  //get the call controlls
  const { toggleVideo, toggleAudio, startScreenShare, stopScreenShare } =
    useCallControls();

  React.useEffect(() => {
    switch (events.event) {
      case "user-joined":
        console.log("user joined");
        const user = events.data.remoteUser;
        user["owner"] = true;
        dispatch(userJoin(user));
        break;
      case "user-published":
        console.log("user published");
        break;
      case "user-unpublished":
        console.log("user unpublished");
        break;
      case "user-left":
        console.log("user left");
        const user2 = events.data.remoteUser;
        dispatch(userLeft(user2));
        break;
      default:
        break;
    }
  }, [events, dispatch]);

  const handleAudio = () => {
    toggleAudio();
    setMute(!mute);
  };
  const handleVideo = () => {
    toggleVideo("Test");
    setVideo(!video);
  };
  const handleScreen = () => {
    if (screenshare) {
      stopScreenShare();
    } else {
      startScreenShare({
        channel: channelSlug,
        token: null,
      });
    }
    setScreenshare(!screenshare);
  };

  return (
    <MeetingOwnerViewContainer>
      <MeetingOwnerViewWrapper>
        <ButtonsWrapper>
          {mute ? (
            <CustomMicOffIcon onClick={handleAudio} />
          ) : (
            <CustomMicIcon onClick={handleAudio} />
          )}
          {video ? (
            <CustomVideocamOffIcon onClick={handleVideo} />
          ) : (
            <CustomVideocamIcon onClick={handleVideo} />
          )}
          {screenshare ? (
            <CustomStopScreenShareIcon onClick={handleScreen} />
          ) : (
            <CustomScreenShareIcon onClick={handleScreen} />
          )}
        </ButtonsWrapper>
        <div style={{ height: "100%", width: "100%" }} id={"Test"}></div>
      </MeetingOwnerViewWrapper>
    </MeetingOwnerViewContainer>
  );
};

export default MeetingOwnerView;

const CustomMicOffIcon = styled(MicOffIcon)`
  cursor: pointer;
`;
const CustomMicIcon = styled(MicIcon)`
  cursor: pointer;
`;
const CustomVideocamOffIcon = styled(VideocamOffIcon)`
  cursor: pointer;
`;
const CustomVideocamIcon = styled(VideocamIcon)`
  cursor: pointer;
`;
const CustomStopScreenShareIcon = styled(StopScreenShareIcon)`
  cursor: pointer;
`;
const CustomScreenShareIcon = styled(ScreenShareIcon)`
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  /* visibility: hidden; */
  /* :hover {
    visibility: visible;
  } */
`;
const MeetingOwnerViewWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;
const MeetingOwnerViewContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-top: 10px;
  color: white;
`;
