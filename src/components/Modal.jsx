import React from "react";
import styled from "styled-components";
import Button from "./Button";
import TextField from "./TextField";

const Modal = ({ handleClose }) => {
  return (
    <ModalContainer>
      <TitleWrapper>
        <h4>Create Team</h4>
      </TitleWrapper>
      <FormWrapper>
        <TextFieldWrapper>
          <TextField placeholder="Name" />
          <TextField placeholder="Description" height="80px" />
          <TextField placeholder="Privacy" />
        </TextFieldWrapper>
        <ButtonWrapper>
          <Button value="Cancel" onClick={handleClose} />
          <Button value="Create Team" />
        </ButtonWrapper>
      </FormWrapper>
    </ModalContainer>
  );
};

export default Modal;

const TitleWrapper = styled.div`
  h4 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #ffffff;

    mix-blend-mode: normal;
    opacity: 0.9;
  }
`;
const FormWrapper = styled.form`
  width: 100%;
  padding: 20px;
`;
const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalContainer = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    241.25deg,
    rgba(41, 39, 85, 0.35) 4.4%,
    rgba(41, 39, 84, 0.78) 61.77%,
    rgba(27, 24, 66, 0.35) 119.94%
  );
  box-shadow: 0px 4px 16px rgba(23, 18, 43, 0.7);
  border-radius: 10px;
`;
