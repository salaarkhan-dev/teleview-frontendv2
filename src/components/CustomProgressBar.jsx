import React from "react";
import { Spinner } from "reactstrap";
import styled from "styled-components";

function CustomProgressBar() {
  return (
    <ProgressBarContainer>
      <Spinner
        style={{
          width: "4rem",
          height: "4rem",
          color: "#11aadf",
        }}
        type="grow"
      />
    </ProgressBarContainer>
  );
}

export default CustomProgressBar;

const ProgressBarContainer = styled.div``;
