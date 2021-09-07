import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttendanceAsync,
  fetchTeamsAsync,
  fetchAttendeesAsync,
  selectorAttendance,
  selectorAttendeesDetail,
  selectorCount,
  selectorIsLoading,
  selectorTeams,
} from "../features/teams/teamsSlice";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import CustomProgressBar from "./CustomProgressBar";
import { setCsvData } from "../features/attendance/attendanceSlice";

const TeamTable = () => {
  const dispatch = useDispatch();
  const teams = useSelector(selectorTeams);
  const count = useSelector(selectorCount);
  const [page, setPage] = React.useState(1);
  const isLoading = useSelector(selectorIsLoading);
  React.useEffect(() => {
    async function fetchTeams(obj) {
      await dispatch(fetchTeamsAsync(obj));
    }
    fetchTeams({
      owns: true,
      page: page,
    });
  }, [dispatch, page]);

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  return (
    <TableContainer>
      <TableHeader>
        <HRow className="header-row">
          <Column>
            <span>ID</span>
          </Column>
          <Column>
            <span>Team</span>
          </Column>
          <Column>
            <span>Privacy</span>
          </Column>
          <Column>
            <span>Created At</span>
          </Column>
          <Column>
            <span>Attendace</span>
          </Column>
        </HRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <ProgressBarWrapper>
            <CustomProgressBar />
          </ProgressBarWrapper>
        ) : teams?.length ? (
          teams?.map((team, id) => {
            return (
              <Row key={id} to={`/attendance/${team.slug}/`}>
                <Column>
                  <span>{team.id}</span>
                </Column>
                <Column>
                  <span>{team.name}</span>
                </Column>
                <Column style={{ textTransform: "capitalize" }}>
                  <span>{team.privacy}</span>
                </Column>
                <Column>
                  <span>{new Date(team.created_at).toLocaleString()}</span>
                </Column>
                <Column>
                  <Button value="View" />
                </Column>
              </Row>
            );
          })
        ) : (
          <h1>No Teams Joined or Created Yet!</h1>
        )}
      </TableBody>
      <TableFooter>
        {count > 1 && !isLoading ? (
          <PaginationWrapper>
            <CustomPagination
              count={count}
              page={page}
              size="small"
              onChange={handlePageChange}
            />
          </PaginationWrapper>
        ) : null}
      </TableFooter>
    </TableContainer>
  );
};

const MeetingListTable = () => {
  const dispatch = useDispatch();
  const attendance = useSelector(selectorAttendance);
  const count = useSelector(selectorCount);
  const [page, setPage] = React.useState(1);
  const isLoading = useSelector(selectorIsLoading);
  const { slug } = useParams();
  React.useEffect(() => {
    async function fetchAttendance(obj) {
      await dispatch(fetchAttendanceAsync(obj));
    }
    fetchAttendance({
      slug: slug,
      page: page,
    });
  }, [dispatch, page, slug]);

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  return (
    <TableContainer>
      <TableHeader>
        <HRow className="header-row">
          <Column>
            <span>ID</span>
          </Column>
          <Column>
            <span>Team</span>
          </Column>
          <Column>
            <span>Meeting</span>
          </Column>
          <Column>
            <span>Created</span>
          </Column>
          <Column>
            <span>Duration</span>
          </Column>
          <Column>
            <span>Attendees</span>
          </Column>
          <Column>
            <span>Present</span>
          </Column>
          <Column>
            <span>Absent</span>
          </Column>
        </HRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <ProgressBarWrapper>
            <CustomProgressBar />
          </ProgressBarWrapper>
        ) : attendance?.length ? (
          attendance?.map((at, id) => {
            return (
              <Row key={id} to={`/attendance/${slug}/${at.id}`}>
                <Column>
                  <span>{at.id}</span>
                </Column>
                <Column style={{ textTransform: "capitalize" }}>
                  <span>{at.team.name}</span>
                </Column>
                <Column style={{ textTransform: "capitalize" }}>
                  <span>{at.meeting_title}</span>
                </Column>
                <Column>
                  <span>{new Date(at.meeting_created).toDateString()}</span>
                </Column>
                <Column>
                  <span>
                    {new Date(at.meeting_duration * 1000)
                      .toISOString()
                      .substr(11, 8)}
                  </span>
                </Column>
                <Column>
                  <span>{at.attendees?.length}</span>
                </Column>
                <Column>
                  <span>
                    {
                      at.attendees?.filter((a) => a.present === "present")
                        .length
                    }
                  </span>
                </Column>
                <Column>
                  <span>
                    {at.attendees?.filter((a) => a.present === "absent").length}
                  </span>
                </Column>
              </Row>
            );
          })
        ) : (
          <h1>No Attendance Record!</h1>
        )}
      </TableBody>
      <TableFooter>
        {count > 1 && !isLoading ? (
          <PaginationWrapper>
            <CustomPagination
              count={count}
              page={page}
              size="small"
              onChange={handlePageChange}
            />
          </PaginationWrapper>
        ) : null}
      </TableFooter>
    </TableContainer>
  );
};
const MeetingDetailTable = () => {
  const dispatch = useDispatch();
  const attendeesDetail = useSelector(selectorAttendeesDetail);
  const isLoading = useSelector(selectorIsLoading);
  const { slug, id } = useParams();
  React.useEffect(() => {
    async function fetchAttendees(obj) {
      await dispatch(fetchAttendeesAsync(obj));
    }
    fetchAttendees({
      slug: slug,
      id: id,
    });
  }, [dispatch, id, slug]);
  React.useEffect(() => {
    function downloadCSV() {
      const atDetail = attendeesDetail;
      const teamName = atDetail?.team.name;
      const meetingName = atDetail?.meeting_title;
      const meetingDate = new Date(atDetail?.meeting_created)
        .toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replaceAll(" ", "_")
        .replaceAll(",", "");
      const fileName = `${meetingDate}_${meetingName}_${teamName}.csv`;
      const data = atDetail?.attendees?.map((at, id) => ({
        id: at.id,
        team: atDetail?.team.name,
        meeting: atDetail?.meeting_title,
        meeting_date: new Date(atDetail?.meeting_created).toDateString(),
        meeting_duration: new Date(atDetail?.meeting_duration * 1000)
          .toISOString()
          .substr(11, 8),
        attendee: at.user?.name?.length ? at.user?.name : at.user?.username,
        attendee_duration: new Date(at?.attendee_duration * 1000)
          .toISOString()
          .substr(11, 8),
        existance:
          ((at?.attendee_duration / atDetail?.meeting_duration) * 100).toFixed(
            2
          ) + "%",
        attentiveness_score: at?.attentiveness_score.toFixed(2) + "%",
        attendance: at?.present === "present" ? "P" : "A",
      }));
      dispatch(
        setCsvData({
          data,
          fileName,
        })
      );
    }
    downloadCSV();
  }, [attendeesDetail, dispatch]);

  return (
    <TableContainer>
      <TableHeader>
        <HRow className="header-row">
          <Column>
            <span>ID</span>
          </Column>
          <Column>
            <span>Team/Meeting</span>
          </Column>
          <Column>
            <span>Meeting Duration</span>
          </Column>
          <Column>
            <span>Attendee</span>
          </Column>
          <Column>
            <span>Attendee Duration</span>
          </Column>
          <Column>
            <span>Existance</span>
          </Column>
          <Column>
            <span>Attentiveness Score</span>
          </Column>
          <Column>
            <span>Attendance</span>
          </Column>
        </HRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <ProgressBarWrapper>
            <CustomProgressBar />
          </ProgressBarWrapper>
        ) : attendeesDetail?.attendees?.length ? (
          attendeesDetail?.attendees?.map((at, id) => {
            return (
              <Row key={id} to={`/attendance/${slug}/${attendeesDetail?.id}`}>
                <Column>
                  <span>{at.id}</span>
                </Column>
                <Column style={{ textTransform: "capitalize" }}>
                  <span>{`${attendeesDetail?.meeting_title}/${attendeesDetail?.meeting_title}`}</span>
                </Column>
                <Column>
                  <span>
                    {new Date(attendeesDetail?.meeting_duration * 1000)
                      .toISOString()
                      .substr(11, 8)}
                  </span>
                </Column>
                <Column>
                  <span>
                    {at.user?.name?.length ? at.user?.name : at.user?.username}
                  </span>
                </Column>
                <Column>
                  <span>
                    {new Date(at?.attendee_duration * 1000)
                      .toISOString()
                      .substr(11, 8)}
                  </span>
                </Column>
                <Column>
                  <span>
                    {(
                      (at?.attendee_duration /
                        attendeesDetail?.meeting_duration) *
                      100
                    ).toFixed(2) + "%"}
                  </span>
                </Column>
                <Column>
                  <span>{at?.attentiveness_score.toFixed(2) + "%"}</span>
                </Column>
                <Column>
                  <span>{at?.present === "present" ? "P" : "A"}</span>
                </Column>
              </Row>
            );
          })
        ) : (
          <h1>No Attendance Record!</h1>
        )}
      </TableBody>
      <TableFooter></TableFooter>
    </TableContainer>
  );
};

const Table = ({ meetinglist, meeting }) => {
  return (
    <>
      {meetinglist ? (
        <MeetingListTable />
      ) : meeting ? (
        <MeetingDetailTable />
      ) : (
        <TeamTable />
      )}
    </>
  );
};

export default Table;

const ProgressBarWrapper = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CustomPagination = styled(Pagination)`
  && {
    width: 100%;
    height: 100%;
    color: #fff;
    .MuiPaginationItem-sizeSmall {
      color: #fff;
      opacity: 0.6;
    }
    .Mui-selected {
      opacity: 1;
      background: linear-gradient(
        135deg,
        #40ddff 0%,
        #14bae3 19.24%,
        #13b1e6 68.64%,
        #11aadf 81.77%,
        #0b98c5 100%
      );
    }
  }
`;
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: radial-gradient(
    190.41% 252.41% at 0% 2.78%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 10px;
`;

const TableFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 100px;
`;

const Column = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  flex: 0.8;
  :nth-child(1) {
    flex: 0.2;
  }
  span {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
`;

const HRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  flex: 1;
  cursor: pointer;
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.8);
  transition: all ease-in 0.1s;
  overflow: auto;

  span {
    opacity: 1;
    font-weight: 500;
  }
`;
const Row = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  flex: 1;
  cursor: pointer;
  overflow: auto;
  border-radius: 5px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  transition: all ease-in 0.1s;

  :hover {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    background-color: #9e9e9e2e;
  }
`;
const TableBody = styled.div`
  padding: 10px;
  margin-bottom: 5px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  overflow-y: scroll;
  max-height: 300px;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;

  h1 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;
const TableHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  position: sticky;
  padding: 10px;
  margin-bottom: 5px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);

  .header-row {
    :hover {
      background-color: transparent;
    }
  }

  h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.8);
  background: linear-gradient(
    180deg,
    rgba(51, 47, 103, 0.0549706) 2.1%,
    rgba(69, 65, 133, 0.169724) 57.45%,
    rgba(61, 60, 125, 0.0586787) 98.26%
  );
  box-shadow: 0px 48px 69px rgba(23, 18, 43, 0.8453);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  padding: 10px;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    border-radius: 15px;
    /* height: 90vh; */
  }
`;
