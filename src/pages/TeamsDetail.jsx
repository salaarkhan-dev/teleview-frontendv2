import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "./../components/Button";
import { ReactComponent as Menu } from "./../assets/icons/menu.svg";
import { ReactComponent as AttachIcon } from "./../assets/icons/attach.svg";
import Member from "../components/Member";
import Post from "../components/Post";
import TextField from "../components/TextField";

const TeamsDetail = () => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  return (
    <TeamsDetailContainer>
      <Head>
        <Left>
          <span>Team Name</span>
        </Left>
        <Right>
          <Button value="Create Team" />
          <Menu />
        </Right>
      </Head>
      <Body>
        <ChatArea>
          <ChatAreaTop>
            <Posts>
              <Post />
              <Post postType="sent" />
              <Post />
              <Post postType="sent" />
              <Post />
              <Post postType="sent" />
              <AlwaysScrollToBottom />
            </Posts>
          </ChatAreaTop>
          <ChatAreaBottom>
            <AttachIcon />
            <TextFieldWrapper>
              <TextField placeholder="Enter a message here..." />
            </TextFieldWrapper>
            <Button value="Send" />
          </ChatAreaBottom>
        </ChatArea>
        <MemberArea>
          <Top>
            <span>Member</span>
          </Top>
          <Middle>
            <MiddleTop>
              <span>Pending Members</span>
            </MiddleTop>
            <MiddleBottom>
              <PendingMembers>
                <span>No Pending Request!</span>
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
              </PendingMembers>
            </MiddleBottom>
          </Middle>
          <Bottom>
            <BottomTop>
              <span>Team Members</span>
            </BottomTop>
            <BottomBottom>
              <TeamMembers>
                <span>No Pending Request!</span>
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
              </TeamMembers>
            </BottomBottom>
          </Bottom>
        </MemberArea>
      </Body>
    </TeamsDetailContainer>
  );
};

export default TeamsDetail;

const ChatAreaTop = styled.div`
  flex: 0.9;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;
const ChatAreaBottom = styled.div`
  flex: 0.1;
  display: flex;
  align-items: center;
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
