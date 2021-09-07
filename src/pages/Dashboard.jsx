import React from "react";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <h1 className="page-title">Dashboard</h1>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
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
