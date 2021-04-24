import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "./../components/Button";
import { ReactComponent as Menu } from "./../assets/icons/menu.svg";
import { ReactComponent as AttachIcon } from "./../assets/icons/attach.svg";
import Post from "../components/Post";
import TextField from "./../components/TextField";
import Member from "../components/Member";

const TeamDetail = () => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  return (
    <TeamDetailContainer>
      <Head>
        <h1 className="page-title">JoinTeams</h1>
        <HeaderRight>
          <Button value="Create Team" />
          <Menu />
        </HeaderRight>
      </Head>
      <Body>
        <BodyLeft>
          <PostWrapper>
            <PostsContainer>
              <Post />
              <Post postType="sent" />
              <Post />
              <Post postType="sent" />
              <Post />
              <Post postType="sent" />
              <AlwaysScrollToBottom />
            </PostsContainer>
          </PostWrapper>
          <TextFieldContainer>
            <AttachIcon />
            <TextFieldWrapper>
              <TextField placeholder="Enter a message here..." />
            </TextFieldWrapper>
            <Button value="Send" />
          </TextFieldContainer>
        </BodyLeft>
        <BodyRight>
          <h4>Members</h4>
          <PendingMembersContainer>
            <h5>Pending Requests</h5>
            <PendingMembersListWrapper>
              <PendingMembersList>
                <span>No Pending Request!</span>
                <Member />
                <Member />
                <Member />
                <Member />
              </PendingMembersList>
            </PendingMembersListWrapper>
          </PendingMembersContainer>
          <MembersContainer>
            <h5>Team Members</h5>
            <MembersListWrapper>
              <MembersList>
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
              </MembersList>
            </MembersListWrapper>
          </MembersContainer>
        </BodyRight>
      </Body>
    </TeamDetailContainer>
  );
};

export default TeamDetail;

const MembersList = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const MembersListWrapper = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
`;
const MembersContainer = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  h5 {
    position: sticky;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.65);
  }
`;

const PendingMembersList = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  height: inherit;

  span {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
  }
`;
const PendingMembersListWrapper = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
`;
const PendingMembersContainer = styled.div`
  flex: 0.2;
  height: inherit;
  display: flex;
  flex-direction: column;

  h5 {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.65);
  }
`;

const TextFieldWrapper = styled.div`
  flex: 1;
`;
const PostWrapper = styled.div`
  flex: 0.9;
  margin-bottom: 8px;
  max-height: 380px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const TextFieldContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 15px;
  flex: 0.1;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  position: sticky;
  width: 100%;
`;
const PostsContainer = styled.div``;
const Body = styled.div`
  display: flex;
  margin-bottom: 15px;
  gap: 15px;
  height: 100%;
  width: inherit;
`;
const BodyLeft = styled.div`
  height: inherit;
  flex: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;
const BodyRight = styled.div`
  height: inherit;
  flex: 0.2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 8px;
  background: linear-gradient(
    180deg,
    rgba(51, 47, 103, 0.0549706) 2.1%,
    rgba(69, 65, 133, 0.169724) 57.45%,
    rgba(61, 60, 125, 0.0586787) 98.26%
  );
  box-shadow: 0px 48px 69px rgba(23, 18, 43, 0.8453);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  h4 {
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
const HeaderRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;
const TeamDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  .page-title {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;
  }
`;
