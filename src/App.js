import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorIsAuthenticated } from "./features/authentication/authSlice";
import Preloader from "./components/Preloader";
const Header = lazy(() => import("./components/Header"));
const SideBar = lazy(() => import("./components/SideBar"));
// const Preloader = lazy(() => import("./components/Preloader"));


const AttendanceDetail = lazy(() => import("./pages/AttendanceDetail"));
const AttendanceDetailMeeting = lazy(() => import("./pages/AttendanceDetailMeeting"));
const TeamDetail = lazy(() => import("./pages/TeamDetail"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Teams = lazy(() => import("./pages/Teams"));
const JoinTeams = lazy(() => import("./pages/JoinTeams"));
const Attendance = lazy(() => import("./pages/Attendance"));
const Settings = lazy(() => import("./pages/Settings"));
const Meeting = lazy(() => import("./pages/Meeting"));

const App = () => {
  const isAuthenticated = useSelector(selectorIsAuthenticated);
  return (
    <Suspense fallback={<Preloader />}>
      <Background>
        <BrowserRouter>
          <Glows>
            {/* <EllipseOne />
          <EllipseTwo />
          <EllipseThree /> */}
            <GlassContainer>
              <Glass>
                {isAuthenticated && <SideBar />}
                <AppContainer>
                  <Header />
                  <Body fluid="md">
                    {!isAuthenticated ? (
                      <Switch>
                        <Route path="/" exact>
                          <Redirect to="/signin" />
                        </Route>
                        <Route path="/signin" exact>
                          <SignIn />
                        </Route>
                        <Route path="/signup" exact>
                          <SignUp />
                        </Route>
                        <Redirect to="/" />
                      </Switch>
                    ) : (
                      <Switch>
                        <Route path="/" exact>
                          <Redirect to="/teams" exact />
                        </Route>
                        {/* <Route path="/dashboard" exact>
                        <Dashboard />
                      </Route> */}
                        <Route path="/teams" exact>
                          <Teams />
                        </Route>
                        <Route
                          path="/teams/:slug/channels/:channelSlug"
                          render={(props) => <TeamDetail {...props} />}
                          exact
                        />
                        <Route
                          path="/teams/:slug/channels/:channelSlug/meeting/:meetingId"
                          render={(props) => <Meeting {...props} />}
                          exact
                        />
                        <Route path="/jointeams" exact>
                          <JoinTeams />
                        </Route>
                        <Route path="/attendance" exact>
                          <Attendance />
                        </Route>
                        <Route
                          path="/attendance/:slug"
                          render={(props) => <AttendanceDetail {...props} />}
                          exact
                        />
                        <Route
                          path="/attendance/:slug/:id"
                          render={(props) => (
                            <AttendanceDetailMeeting {...props} />
                          )}
                          exact
                        />
                        <Route path="/settings" exact>
                          <Settings />
                        </Route>
                        <Redirect to="/" />
                      </Switch>
                    )}
                  </Body>
                </AppContainer>
              </Glass>
            </GlassContainer>
          </Glows>
        </BrowserRouter>
      </Background>
    </Suspense>
  );
};

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const Body = styled(Container)`
  margin-top: 10px;
  height: 100%;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: radial-gradient(50% 50% at 50% 50%, #201d47 0%, #17153a 100%); */
  background: rgb(32, 29, 71);
  background: -moz-radial-gradient(
    circle,
    rgba(32, 29, 71, 1) 0%,
    rgba(23, 21, 58, 1) 100%
  );
  background: -webkit-radial-gradient(
    circle,
    rgba(32, 29, 71, 1) 0%,
    rgba(23, 21, 58, 1) 100%
  );
  background: radial-gradient(
    circle,
    rgba(32, 29, 71, 1) 0%,
    rgba(23, 21, 58, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#201d47",endColorstr="#17153a",GradientType=1);
  position: fixed;
`;

const Glows = styled.div`
  width: 100vw;
  height: 100vh;
`;
// const EllipseOne = styled.div`
//   position: absolute;
//   width: 30%;
//   height: 25%;
//   background: linear-gradient(
//     226.43deg,
//     rgba(244, 255, 5, 0.311775) 1.63%,
//     rgba(203, 61, 196, 0.8) 45.46%,
//     rgba(111, 190, 218, 0.8) 79.42%,
//     rgba(56, 255, 231, 0.391259) 100%
//   );
//   mix-blend-mode: normal;
//   opacity: 0.9;
//   filter: blur(100px);
//   transform: rotate(-36.9deg);
// `;
// const EllipseTwo = styled.div`
//   position: absolute;
//   bottom: 5%;
//   left: 45%;
//   width: 50%;
//   height: 40%;
//   background: linear-gradient(
//     226.43deg,
//     rgba(244, 255, 5, 0.311775) 1.63%,
//     rgba(203, 61, 196, 0.8) 45.46%,
//     rgba(111, 190, 218, 0.8) 79.42%,
//     rgba(56, 255, 231, 0.391259) 100%
//   );
//   mix-blend-mode: normal;
//   opacity: 0.7;
//   filter: blur(100px);
// `;
// const EllipseThree = styled.div`
//   position: absolute;
//   right: 5%;
//   width: 50%;
//   height: 50%;
//   background: linear-gradient(
//     226.43deg,
//     rgba(244, 255, 5, 0.292289) 1.63%,
//     rgba(203, 61, 196, 0.75) 45.46%,
//     rgba(111, 190, 218, 0.75) 79.42%,
//     rgba(56, 255, 231, 0.366805) 100%
//   );
//   mix-blend-mode: normal;
//   opacity: 0.7;
//   filter: blur(100px);
// `;
const GlassContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  padding: 15px;

  @media (max-width: 768px) {
    padding: 15px 10px;
  }
`;

const Glass = styled.div`
  display: flex;
  align-items: center;
  /* background: linear-gradient(
    180deg,
    rgba(51, 47, 103, 0.0549706) 2.1%,
    rgba(69, 65, 133, 0.169724) 57.45%,
    rgba(61, 60, 125, 0.0586787) 98.26%
  ); */
  box-shadow: 0px 48px 69px rgba(0, 0, 0, 0.5453);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    border-radius: 15px;
    /* height: 90vh; */
  }
`;
