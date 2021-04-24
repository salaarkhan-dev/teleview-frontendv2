import React from "react";
import styled from "styled-components";
import icon from "../assets/icons/logout1.svg";

const DropDown = () => {
  return (
    <CustomDropdownContainer>
      <CustomDropdown placeholder="Privacy" icon={icon}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </CustomDropdown>
    </CustomDropdownContainer>
  );
};

export default DropDown;

const CustomDropdown = styled.select`
  background-color: transparent;
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  option {
    color: black;
    border-radius: 5px;
  }
  .select-selected.select-arrow-active:after {
    background-color: red;
    border-color: transparent transparent #000 transparent;
    top: 7px;
  }
`;
const CustomDropdownContainer = styled.div`
  width: ${({ width }) => (width ? width : "inherit")};
  height: ${({ height }) => (height ? height : "40px")};

  background: radial-gradient(
    100% 249.45% at 0% 2.78%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 100%
  );

  border: 2px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 8px;
`;
