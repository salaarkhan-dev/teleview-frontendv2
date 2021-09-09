import React from "react";
import { Spinner } from "reactstrap";
import styled from "styled-components";

function CustomProgressBar(props) {
  return (
    <ProgressBarContainer {...props}>
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

const ProgressBarContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;
