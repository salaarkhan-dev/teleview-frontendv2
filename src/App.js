import React from "react";
import styled from "styled-components";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { Container } from "reactstrap";
import Teams from "./pages/Teams";
import JoinTeams from "./pages/JoinTeams";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  return (
    <Background>
      <BrowserRouter>
        <Glows>
          <EllipseOne />
          <EllipseTwo />
          <EllipseThree />
          <Switch>
            <GlassContainer>
              <Glass>
                <SideBar />
                <AppContainer>
                  <Header />
                  <Body fluid="md">
                    <Route path="/" exact>
                      <Redirect to="/dashboard" exact />
                    </Route>
                    <Route path="/dashboard" exact>
                      <Dashboard />
                    </Route>
                    <Route path="/teams" exact>
                      <Teams />
                    </Route>
                    <Route path="/jointeams" exact>
                      <JoinTeams />
                    </Route>
                    <Route path="/profile" exact>
                      <Profile />
                    </Route>
                    <Route path="/attendance" exact>
                      <Attendance />
                    </Route>
                    <Route path="/settings" exact>
                      <Settings />
                    </Route>
                  </Body>
                </AppContainer>
              </Glass>
            </GlassContainer>
            {/* <Redirect to="/dashboard" /> */}
          </Switch>
        </Glows>
      </BrowserRouter>
    </Background>
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
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: radial-gradient(50% 50% at 50% 50%, #201d47 0%, #17153a 100%);
  position: fixed;
`;

const Glows = styled.div`
  width: 100vw;
  height: 100vh;
`;
const EllipseOne = styled.div`
  position: absolute;
  width: 30%;
  height: 25%;
  background: linear-gradient(
    226.43deg,
    rgba(244, 255, 5, 0.311775) 1.63%,
    rgba(203, 61, 196, 0.8) 45.46%,
    rgba(111, 190, 218, 0.8) 79.42%,
    rgba(56, 255, 231, 0.391259) 100%
  );
  mix-blend-mode: normal;
  opacity: 0.9;
  filter: blur(100px);
  transform: rotate(-36.9deg);
`;
const EllipseTwo = styled.div`
  position: absolute;
  bottom: 5%;
  left: 45%;
  width: 50%;
  height: 40%;
  background: linear-gradient(
    226.43deg,
    rgba(244, 255, 5, 0.311775) 1.63%,
    rgba(203, 61, 196, 0.8) 45.46%,
    rgba(111, 190, 218, 0.8) 79.42%,
    rgba(56, 255, 231, 0.391259) 100%
  );
  mix-blend-mode: normal;
  opacity: 0.7;
  filter: blur(100px);
`;
const EllipseThree = styled.div`
  position: absolute;
  right: 5%;
  width: 50%;
  height: 50%;
  background: linear-gradient(
    226.43deg,
    rgba(244, 255, 5, 0.292289) 1.63%,
    rgba(203, 61, 196, 0.75) 45.46%,
    rgba(111, 190, 218, 0.75) 79.42%,
    rgba(56, 255, 231, 0.366805) 100%
  );
  mix-blend-mode: normal;
  opacity: 0.7;
  filter: blur(100px);
`;
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
  background: linear-gradient(
    180deg,
    rgba(51, 47, 103, 0.0549706) 2.1%,
    rgba(69, 65, 133, 0.169724) 57.45%,
    rgba(61, 60, 125, 0.0586787) 98.26%
  );
  box-shadow: 0px 48px 69px rgba(23, 18, 43, 0.8453);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    border-radius: 15px;
    /* height: 90vh; */
  }
`;
