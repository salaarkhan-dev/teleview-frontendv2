import React from "react";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Top>
        <h1 className="page-title">Dashboard</h1>
      </Top>
      <Bottom>jj</Bottom>
    </DashboardContainer>
  );
};

export default Dashboard;

const Top = styled.div`
  .page-title {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;
    width: 100%;
    opacity: 0.8;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const Bottom = styled.div`
  flex: 1;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  background-color: red;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
  color: #ffffff;
`;
