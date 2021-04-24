import React from "react";
import Avatar from "./Avatar";
import styled from "styled-components";

const Post = ({ postType }) => {
  return (
    <PostContainer postType={postType}>
      <Avatar />
      <PostContentWrapper postType={postType}>
        <UsernameWrapper>
          <h3>Salaar Khan</h3>
        </UsernameWrapper>
        <PostContent>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi ea
            porro aspernatur! Voluptate magni repellendus a temporibus
            praesentium, cupiditate ipsam ad repudiandae rerum dolorum
            voluptatibus, autem voluptates ipsum similique aut.
          </p>
        </PostContent>
        <TimeWrapper>
          <h4>06:24 PM</h4>
        </TimeWrapper>
      </PostContentWrapper>
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`
  display: flex;
  flex-direction: ${({ postType }) =>
    postType === "sent" ? "row-reverse" : "row"};
  align-items: center;
  gap: 20px;
  margin: 15px 0;
`;
const PostContentWrapper = styled.div`
  width: 550px;
  height: auto;
  min-height: 50px;
  padding: 10px;

  @media (max-width: 990px) {
    width: 450px;
  }
  @media (max-width: 768px) {
    width: 450px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ postType }) =>
    postType === "sent"
      ? `background: radial-gradient(
          100% 249.45% at 0% 2.78%,
           rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0) 100%
            );
            border: 2px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            border-radius: 20px;`
      : `background: linear-gradient(
    135deg,
    #40ddff 0%,
    #14bae3 19.24%,
    #13b1e6 68.64%,
    #11aadf 81.77%,
    #0b98c5 100%
  );
  box-shadow: 1px 4px 15px rgba(64, 221, 255, 0.35);
  border-radius: 10px;`};
`;
const PostContent = styled.div`
  display: flex;
  flex-wrap: wrap;

  p {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    opacity: 0.8;
    display: flex;
    align-items: center;
    color: #ffffff;

    @media (max-width: 990px) {
      font-size: 10px;
    }
    @media (max-width: 768px) {
      font-size: 10px;
    }
    @media (max-width: 630px) {
      font-size: 8px;
    }
  }
`;
const TimeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  h4 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);

    mix-blend-mode: normal;

    @media (max-width: 990px) {
      font-size: 10px;
    }
    @media (max-width: 768px) {
      font-size: 10px;
    }
    @media (max-width: 630px) {
      font-size: 8px;
    }
  }
`;
const UsernameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  h3 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;

    @media (max-width: 990px) {
      font-size: 14px;
    }
    @media (max-width: 768px) {
      font-size: 12px;
    }
    @media (max-width: 630px) {
      font-size: 10px;
    }
  }
`;
