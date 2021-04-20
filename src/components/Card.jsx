import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import Button from "./Button";

const Card = ({ btnValue }) => {
  return (
    <CardContainer>
      <CardWrapper>
        <Avatar />
        <h4>Team Name</h4>
        <h5>
          Lorem, ipsum dolor sit amet conjk ddjfh jjh sectetur adipisicing elit.
          Maxime, aspernatur!
        </h5>
        <Button value={btnValue ? btnValue : "Default"} />
      </CardWrapper>
    </CardContainer>
  );
};

export default Card;

const CardWrapper = styled.div`
  display: flex;
  padding: 15px;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    margin-top: 12px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    color: rgba(255, 255, 255, 0.9);
  }

  h5 {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.75);
  }
`;
const CardContainer = styled.div`
  width: 300px;
  height: 200px;

  background: linear-gradient(
    241.25deg,
    rgba(41, 39, 85, 0.35) 4.4%,
    rgba(41, 39, 84, 0.78) 61.77%,
    rgba(27, 24, 66, 0.35) 119.94%
  );
  box-shadow: 0px 10px 16px rgba(23, 18, 43, 0.3);
  backdrop-filter: blur(23px);
  border-radius: 10px;

  @media (max-width: 415px) {
    width: 250px;
    height: 170px;
  }
`;
