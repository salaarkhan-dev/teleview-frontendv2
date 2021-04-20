import React from "react";
import styled from "styled-components";

const Settings = () => {
  return (
    <SettingsContainer>
      <h1 className="page-title">Settings</h1>
    </SettingsContainer>
  );
};

export default Settings;

const SettingsContainer = styled.div`
  .page-title {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;
  }
`;
