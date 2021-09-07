import React from "react";
import styled from "styled-components";
import Table from "../components/Table";
import Button from "../components/Button";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import {
  selectorData,
  selectorFileName,
} from "../features/attendance/attendanceSlice";

const AttendanceDetailMeeting = () => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Team", key: "team" },
    { label: "Meeting", key: "meeting" },
    { label: "Meeting Date", key: "meeting_date" },
    { label: "Meeting Duration", key: "meeting_duration" },
    { label: "Attendee", key: "attendee" },
    { label: "Attendee Duration", key: "attendee_duration" },
    { label: "Existance", key: "existance" },
    { label: "Attentiveness Score", key: "attentiveness_score" },
    { label: "Attendance", key: "attendance" },
  ];
  const data = useSelector(selectorData);
  const filename = useSelector(selectorFileName);
  return (
    <AttendanceDetailMeetingContainer>
      <Top>
        <h1 className="page-title">Attendance</h1>
        <CSVLink
          data={data ? data : [{}]}
          headers={headers}
          filename={filename}
        >
          <Button value="Download CSV" />
        </CSVLink>
      </Top>
      <AttendanceDetailMeetingWrapper>
        <Table meeting />
      </AttendanceDetailMeetingWrapper>
    </AttendanceDetailMeetingContainer>
  );
};

export default AttendanceDetailMeeting;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
const AttendanceDetailMeetingWrapper = styled.div``;

const AttendanceDetailMeetingContainer = styled.div`
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
