import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import Button from "./Button";

const Member = () => {
  return (
    <MemberContainer>
      <Left>
        <Avatar width="50px" height="49px" radius="12px" />
      </Left>
      <Right>
        <Top>
          <span>Noman</span>
        </Top>
        <Bottom>
          <Button
            value="Confirm"
            width="60px"
            height="20px"
            radius="6px"
            fontSize="12px"
          />
          <Button
            value="Cancel"
            className="secondary"
            width="60px"
            height="20px"
            radius="6px"
            fontSize="12px"
          />
        </Bottom>
      </Right>
    </MemberContainer>
  );
};

export default Member;

const MemberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
`;
const Left = styled.div``;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Top = styled.div`
  span {
    font-family: "Poppins";
    font-style: normal;
    font-size: 14px;
    font-weight: 500;
    color: #b1afcd;
    mix-blend-mode: normal;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px;
`;
