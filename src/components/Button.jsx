import React from "react";
import styled from "styled-components";

const Button = ({ value, ...buttonProps }) => {
  return (
    <>
      <CustomButton
        type="button"
        value={value ? value : "Button"}
        {...buttonProps}
      />
    </>
  );
};

export default Button;

const CustomButton = styled.input`
  border: none;
  outline: none;
  width: 149px;
  height: 34px;

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  color: #ffffff;

  background: linear-gradient(
    135deg,
    #40ddff 0%,
    #14bae3 19.24%,
    #13b1e6 68.64%,
    #11aadf 81.77%,
    #0b98c5 100%
  );
  border-radius: 10px;
  filter: drop-shadow(1px 4px 15px rgba(130, 197, 212, 0.2));

  &:hover {
    filter: drop-shadow(1px 4px 15px rgba(64, 221, 255, 0.3));
    transition: filter 0.25s ease;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 35px;
    font-size: 12px;
  }
  @media (max-width: 415px) {
    width: 90px;
    height: 35px;
    font-size: 12px;
    border-radius: 7px;
  }
`;
