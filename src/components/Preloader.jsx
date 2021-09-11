import React from "react";
import { Spinner } from "reactstrap";
import styled from "styled-components";

const Preloader = () => {
  return (
    <PreloaderContainer>
      <PreloaderWrapper>
        <Spinner
          style={{
            width: "4rem",
            height: "4rem",
            color: "#11aadf",
          }}
          type="grow"
        />
      </PreloaderWrapper>
    </PreloaderContainer>
  );
};

export default Preloader;

const PreloaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const PreloaderContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(50% 50% at 50% 50%, #201d47 0%, #17153a 100%);
`;
