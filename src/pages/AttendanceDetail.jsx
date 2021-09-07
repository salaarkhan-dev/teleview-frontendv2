import React from "react";
import styled from "styled-components";
import Table from "../components/Table";

const AttendanceDetail = (props) => {
  return (
    <AttendanceDetailContainer>
      <h1 className="page-title">AttendanceDetail</h1>
      <AttendanceDetailWrapper>
        <Table meetinglist />
      </AttendanceDetailWrapper>
    </AttendanceDetailContainer>
  );
};

export default AttendanceDetail;

const AttendanceDetailWrapper = styled.div``;

const AttendanceDetailContainer = styled.div`
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
