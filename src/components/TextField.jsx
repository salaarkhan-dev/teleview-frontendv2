import React from "react";
import styled from "styled-components";

const TextField = ({ name, placeholder, width, height }) => {
  return (
    <TextFieldContainer width={width} height={height}>
      <input
        type="text"
        name={name}
        placeholder={placeholder ? placeholder : "placeholder"}
      />
    </TextFieldContainer>
  );
};

export default TextField;

const TextFieldContainer = styled.div`
  width: ${({ width }) => (width ? width : "5inherit")};
  height: ${({ height }) => (height ? height : "40px")};
  background: radial-gradient(
    100% 249.45% at 0% 2.78%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    outline: none;
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
      font-size: 12px;
    }

    ::placeholder {
      color: rgba(255, 255, 255, 0.4);
      opacity: 1;
    }

    :-ms-input-placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    ::-ms-input-placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }
`;
