import React from "react";
import styled from "styled-components";

const TextArea = ({ name, placeholder, width, height, children }) => {
  return (
    <TextAreaContainer width={width} height={height}>
      <textarea placeholder={placeholder} name={name}>
        {children}
      </textarea>
    </TextAreaContainer>
  );
};

export default TextArea;

const TextAreaContainer = styled.div`
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

  textarea {
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
    resize: none;

    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

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
