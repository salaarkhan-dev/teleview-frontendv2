import React from "react";
import styled from "styled-components";
import Dp from "../assets/avatars/1.png";

const Avatar = ({ src, ...props }) => {
  return (
    <AvatarGlass {...props}>
      <img src={src ? src : Dp} alt="avatar" />
    </AvatarGlass>
  );
};

export default Avatar;

const AvatarGlass = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width : "4.3rem")};
  height: ${({ height }) => (height ? height : "4.3rem")};

  background: radial-gradient(
    100% 249.45% at 0% 2.78%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: ${({ radius }) => (radius ? radius : "20px")};

  @media (max-width: 768px) {
    width: 3.125rem;
    height: 3.0625rem;
    border-radius: 15px;
  }
  @media (max-width: 480px) {
    width: 3.3rem;
    height: 2.8rem;
    border-radius: 10px;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;
