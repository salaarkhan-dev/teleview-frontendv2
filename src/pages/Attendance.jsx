import React from "react";
import styled from "styled-components";

const Attendance = () => {
  return (
    <AttendanceContainer>
      <h1 className="page-title">Attendance</h1>
    </AttendanceContainer>
  );
};

export default Attendance;

const AttendanceContainer = styled.div`
  .page-title {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;
  }
`;
