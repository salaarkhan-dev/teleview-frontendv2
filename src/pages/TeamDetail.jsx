import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { ReactComponent as Attach } from "./../assets/icons/attach.svg";
import { ReactComponent as Cancel } from "./../assets/icons/cancel.svg";
import Member from "../components/Member";
import Post from "../components/Post";
import TextField from "../components/TextField";
import { useDispatch, useStore } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchTeamsDetailsAsync,
  leaveTeamsAsync,
  deleteTeamsAsync,
  newPost,
  selectorIsLoading,
  selectorIsOwner,
  selectorMeetings,
  selectorMeetingId,
  selectorPosts,
  selectorTeamsDetails,
} from "../features/teams/teamsSlice";
import PostSkeleton from "./../components/PostSkeleton";
import { Skeleton } from "@material-ui/lab";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CreateMeetingModal from "../components/CreateMeetingModal";
import { useHistory } from "react-router";
import { SOCKET_URL } from "../api/endpoints";
import { useSnackbar } from "notistack";
import CustomSpinner from "../components/CustomSpinner";

const TeamsDetail = (props) => {
  const fileRef = React.useRef(null);
  const client = React.useRef(null);
  const [state, setState] = React.useState({
    content: "",
    files: "",
    extension: "",
    fileName: "",
    posts: [],
  });

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView(), []);
    return <div ref={elementRef} />;
  };
  const dispatch = useDispatch();
  const store = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const isLoading = useSelector(selectorIsLoading);
  const teamsDetail = useSelector(selectorTeamsDetails);
  const posts = useSelector(selectorPosts);
  const meetings = useSelector(selectorMeetings);
  const meetingId = useSelector(selectorMeetingId);
  const isOwner = useSelector(selectorIsOwner);
  const slug = props.match.params.slug;
  const channelSlug = props.match.params.channelSlug;
  const token = localStorage.getItem("token").replace(/["]+/g, "");
  let socketTimeout;
  const [open, setOpen] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
    async function fetchTeamsDetail(obj) {
      await dispatch(fetchTeamsDetailsAsync(obj));
    }

    fetchTeamsDetail({
      slug: slug,
    });
    connectSockets();
    return () => {
      client.current.close();
      clearTimeout(socketTimeout);
    };
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!client.current) return;

    client.current.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.command === "new_post") {
        setSending(false);
        dispatch(newPost(dataFromServer.post));
      }
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleJoinMeeting = async (e) => {
    e.preventDefault();
    client.current.send(
      JSON.stringify({
        type: "message",
        command: "join_meeting",
        channel: channelSlug,
        slug: slug,
        meetingId: meetingId,
      })
    );
    history.push(`${history.location.pathname}/meeting/${meetingId}/`);
  };
  const handleLeaveTeam = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        leaveTeamsAsync({
          slug: slug,
        })
      );
      if (store.getState().teams.isLeaved) {
        enqueueSnackbar("Team leaved successfully!", {
          variant: "success",
        });
        history.push("/teams");
      } else {
        enqueueSnackbar("An error occured while leaving teams!", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occured while requesting to the server!", {
        variant: "error",
      });
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        deleteTeamsAsync({
          slug: slug,
        })
      );
      if (store.getState().teams.isDeleted) {
        enqueueSnackbar("Team deleted successfully!", {
          variant: "success",
        });
        history.push("/teams");
      } else {
        enqueueSnackbar("An error occured while deleting teams!", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occured while requesting to the server!", {
        variant: "error",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    client.current.send(
      JSON.stringify({
        type: "message",
        command: "new_post",
        content: state.content,
        files: state.files,
        extension: state.extension,
        channel: channelSlug,
      })
    );
    setState({
      content: "",
      files: "",
      extension: "",
      fileName: "",
    });
  };

  const handleKeyDown = (e) => {
    if (e.which === 13) {
      handleSubmit(e);
      e.preventDefault();
    }
  };
  function getBase64(file, ext) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setState((state) => ({
        ...state,
        files: reader.result,
        extension: ext,
        fileName: file.name,
      }));
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  const handleFile = async (e) => {
    const ext = e.target.files[0].name.split(".").pop();
    await getBase64(e.target.files[0], ext);
  };

  return (
    <>
      <TeamsDetailContainer>
        <Head>
          <Left>
            <span>
              {isLoading || typeof teamsDetail === "undefined" ? (
                <Skeleton animation="wave" width={200} />
              ) : (
                teamsDetail.name
              )}
            </span>
          </Left>
          <Right>
            {isLoading || typeof meetings === "undefined" ? (
              <Skeleton animation="wave" width={200} height={50} />
            ) : !meetings.length && isOwner ? (
              <Button value="Create Meeting" onClick={handleOpen} />
            ) : null}
            {isLoading || typeof meetings === "undefined" ? (
              <Skeleton animation="wave" width={200} height={50} />
            ) : meetings.length ? (
              <Button value="Join Meeting" onClick={handleJoinMeeting} />
            ) : null}

            {isLoading ? (
              <Skeleton animation="wave" width={200} height={50} />
            ) : isOwner ? (
              <Button
                value="Delete Teams"
                className="secondary"
                onClick={handleDelete}
              />
            ) : (
              <Button
                value="Leave Teams"
                className="secondary"
                onClick={handleLeaveTeam}
              />
            )}
          </Right>
        </Head>
        <Body>
          <ChatArea>
            <ChatAreaTop>
              <Posts>
                {isLoading || typeof teamsDetail === "undefined" ? (
                  <>
                    <PostSkeleton width={400} />
                    <PostSkeleton width={600} type="sent" />
                    <PostSkeleton width={500} />
                    <PostSkeleton width={300} type="sent" />
                  </>
                ) : posts.length ? (
                  posts.map((post, index) => {
                    return <Post postType="sent" key={index} {...post} />;
                  })
                ) : null}
                <AlwaysScrollToBottom />
              </Posts>
            </ChatAreaTop>

            <ChatAreaBottom>
              {state.fileName.length > 0 ? (
                <ChatAreaBottomTop>
                  <span>{state.fileName}</span>
                  <CancelIcon
                    onClick={() =>
                      setState({
                        ...state,
                        files: "",
                        fileName: "",
                        extension: "",
                      })
                    }
                  />
                </ChatAreaBottomTop>
              ) : null}
              <ChatAreaBottomBottom>
                <input
                  type="file"
                  name="file"
                  ref={fileRef}
                  style={{ display: "none" }}
                  accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.ppt,.pptx,.xlxs,.xlx,.csv,.txt"
                  onChange={handleFile}
                />
                <AttachIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => fileRef.current.click()}
                />
                <TextFieldWrapper>
                  <TextField
                    name="content"
                    placeholder="Enter a message here..."
                    value={state.content}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </TextFieldWrapper>
                {(sending && <CustomSpinner />) || (
                  <Button value="Send" type="submit" onClick={handleSubmit} />
                )}
              </ChatAreaBottomBottom>
            </ChatAreaBottom>
          </ChatArea>
          <MemberArea>
            <Top>
              <span>Members</span>
            </Top>
            {teamsDetail?.pending_members.length > 0 && (
              <Middle>
                <MiddleTop>
                  <span>Pending Members</span>
                </MiddleTop>
                <MiddleBottom>
                  <PendingMembers>
                    {isLoading || typeof teamsDetail === "undefined" ? (
                      <Skeleton animation="wave" width={200} height={50} />
                    ) : teamsDetail.pending_members.length ? (
                      teamsDetail.pending_members.map((member, idx) => {
                        return <Member {...member} pending key={idx} />;
                      })
                    ) : (
                      <span>No Pending Request!</span>
                    )}
                  </PendingMembers>
                </MiddleBottom>
              </Middle>
            )}
            <Bottom>
              <BottomTop>
                <span>Team Members</span>
              </BottomTop>
              <BottomBottom>
                <TeamMembers>
                  {isLoading || typeof teamsDetail === "undefined" ? (
                    <Skeleton animation="wave" width={200} height={50} />
                  ) : teamsDetail.members.length ? (
                    teamsDetail.members.map((member, idx) => {
                      return <Member {...member} team key={idx} />;
                    })
                  ) : null}
                </TeamMembers>
              </BottomBottom>
            </Bottom>
          </MemberArea>
        </Body>
      </TeamsDetailContainer>
      <ModalContainer open={open}>
        <ModalWrapper>
          <CreateMeetingModal handleClose={handleClose} />
        </ModalWrapper>
      </ModalContainer>
    </>
  );
};

export default TeamsDetail;

const ModalContainer = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  width: 100vw;
  height: 100vh;
`;
const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ChatAreaTop = styled.div`
  flex: 0.9;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;
const ChatAreaBottomTop = styled.div`
  padding-left: 32px;
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #ffffff;
    text-transform: uppercase;
  }
`;
const AttachIcon = styled(Attach)`
  display: block;
  cursor: pointer;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;
const CancelIcon = styled(Cancel)`
  cursor: pointer;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;
const ChatAreaBottomBottom = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
const ChatAreaBottom = styled.form`
  flex: 0.1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
`;
const TextFieldWrapper = styled.div`
  flex: 1;
`;
const Posts = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;

  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TeamsDetailContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  flex: 0.1;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-bottom: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const ChatArea = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  @media (max-width: 1200px) {
    flex: 1;
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

  @media (max-width: 1200px) {
    display: none;
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

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.29;
`;

const MiddleTop = styled.div`
  flex: 0.1;
  position: sticky;
  span {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.65);
  }
`;
const MiddleBottom = styled.div`
  flex: 0.9;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* overflow: hidden; */
`;
const PendingMembers = styled.div`
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

const Bottom = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: column;
`;
const BottomTop = styled.div`
  flex: 0.1;
  position: sticky;
  span {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.65);
  }
`;
const BottomBottom = styled.div`
  flex: 0.9;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;
const TeamMembers = styled.div`
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
