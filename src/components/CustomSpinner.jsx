import React from "react";
import { Spinner } from "reactstrap";
import styled from "styled-components";

function CustomSpinner({ size, className, ...spinnerProps }) {
  return (
    <CustomSpinnerContainer
      className={className ? className : "primary"}
      {...spinnerProps}
    >
      <Spinner size={size ? size : "sm"} />
    </CustomSpinnerContainer>
  );
}

export default CustomSpinner;

const CustomSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: not-allowed;
  width: ${({ width }) => (width ? width : "149px")};

  height: ${({ height }) => (height ? height : "34px")};

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "14px")};
  text-align: center;
  color: ${({ className }) => (className === "primary" ? `#fff;` : `#12AEE3`)};
  background: ${({ className }) =>
    className === "primary"
      ? `linear-gradient(135deg,#40ddff 0%,#14bae3 19.24%,
    #13b1e6 68.64%,
    #11aadf 81.77%,
    #0b98c5 100%
  );`
      : "#fff;"};
  border-radius: ${({ radius }) => (radius ? radius : "10px")};
  filter: ${({ className }) =>
    className === "primary"
      ? `drop-shadow(1px 4px 15px rgba(130, 197, 212, 0.2));`
      : `drop-shadow(1px 4px 15px rgba(255, 255, 255, 0.2));`};

  &:hover {
    filter: ${({ className }) =>
      className === "primary"
        ? `drop-shadow(1px 4px 15px rgba(64, 221, 255, 0.3));`
        : `drop-shadow(1px 4px 15px rgba(255, 255, 255, 0.3));`};
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
