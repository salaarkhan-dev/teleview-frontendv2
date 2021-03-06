import React from "react";
import styled from "styled-components";
import Table from "../components/Table";

const Attendance = () => {
  return (
    <AttendanceContainer>
      <h1 className="page-title">Attendance</h1>
      <AttendanceWrapper>
        <Table />
      </AttendanceWrapper>
    </AttendanceContainer>
  );
};

export default Attendance;

const AttendanceWrapper = styled.div``;

const AttendanceContainer = styled.div`
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
