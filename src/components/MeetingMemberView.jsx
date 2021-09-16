import {
  useCallControls,
  useCallEvents,
  useJoinCall,
} from "@agnostech/react-agora-ng";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectorMeetingUsers,
  userJoin,
  userLeft,
} from "../features/meeting/meetingSlice";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

const MeetingMemberView = ({ channelSlug }) => {
  const users = useSelector(selectorMeetingUsers);
  const { events } = useCallEvents();
  const [mute, setMute] = React.useState(false);
  const dispatch = useDispatch();

  // join the call
  useJoinCall({
    channel: channelSlug,
    userId: null,
    token: null,
    localVideoDiv: "Test",
  });

  //get the call controlls
  const { toggleAudio } = useCallControls();

  const handleAudio = () => {
    toggleAudio();
    setMute(!mute);
  };
  React.useEffect(() => {
    switch (events.event) {
      case "user-joined":
        console.log("user joined");
        const user = events.data.remoteUser;
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

  return (
    <MeetingMemberViewContainer>
      <ButtonWrapper onClick={handleAudio}>
        {mute ? (
          <CustomMicOffIcon onClick={handleAudio} />
        ) : (
          <CustomMicIcon onClick={handleAudio} />
        )}
      </ButtonWrapper>
      <MeetingMemberViewWrapper>
        {users.map((user, ID) =>
          user.videoTrack ? (
            <div key={user.uid.toString()} id={user.uid.toString()}>
              {user.videoTrack && user.videoTrack.play(user.uid.toString())}
              {user.audioTrack && user.audioTrack.play()}
            </div>
          ) : null
        )}
      </MeetingMemberViewWrapper>
    </MeetingMemberViewContainer>
  );
};

export default MeetingMemberView;

const CustomMicOffIcon = styled(MicOffIcon)`
  cursor: pointer;
`;
const CustomMicIcon = styled(MicIcon)`
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
  padding: 10px;
`;

const MeetingMemberViewWrapper = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  @media (max-width: 768px) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;

    .agora_video_player {
      object-fit: scale-down !important;
      flex: 1;
    }
  }
`;
const MeetingMemberViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: inherit;
  flex: 1;
  color: white;
`;
