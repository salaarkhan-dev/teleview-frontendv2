import React from "react";
import styled from "styled-components";
import Dp from "../assets/avatars/1.png";

const Avatar = ({ src }) => {
  return (
    <AvatarGlass>
      <img src={src ? src : Dp} alt="avatar" />
    </AvatarGlass>
  );
};

export default Avatar;

const AvatarGlass = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 69px;

  background: radial-gradient(
    100% 249.45% at 0% 2.78%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: 20px;

  @media (max-width: 768px) {
    width: 50px;
    height: 49px;
    border-radius: 15px;
  }

  img {
    width: 70px;
    height: 63px;

    @media (max-width: 768px) {
      width: 50px;
      height: 43px;
    }
  }
`;
