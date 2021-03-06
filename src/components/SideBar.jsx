import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as Team } from "../assets/icons/Vector-1.svg";
import { ReactComponent as Search } from "../assets/icons/Vector-2.svg";
import { ReactComponent as Attendance } from "../assets/icons/Vector-3.svg";
// import { ReactComponent as Home } from "../assets/icons/Vector-4.svg";
import { ReactComponent as Setting } from "../assets/icons/Vector.svg";
import { ReactComponent as Logout } from "../assets/icons/logout1.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authentication/authSlice";
import { selectorSidebarToggle } from "../features/sidebar/sidebarSlice";

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedPage, setSelectedPage] = React.useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const sidebarToggle = useSelector(selectorSidebarToggle);

  const handleMenuItemClick = (index, page) => {
    setSelectedIndex(index);
    setSelectedPage(page);
  };
  React.useEffect(() => {
    const data = localStorage.getItem("selected-index");
    const page = localStorage.getItem("selected-page");
    if (page) {
      setSelectedIndex(JSON.parse(data));
      setSelectedPage(JSON.parse(page));
    }
  }, []);

  // React.useEffect(() => {
  //   console.log("Path", history.location.pathname.split("/"))
  // });
  

  React.useEffect(() => {
    localStorage.setItem("selected-index", JSON.stringify(selectedIndex));
    localStorage.setItem("selected-page", JSON.stringify(selectedPage));
  });
  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    history.push("/");
  };
  return (
    <SideBarContainer sidebarToggle={sidebarToggle}>
      <Icons>
        {/* <Link to="/dashboard">
          <HomeIcon
            active={`${selectedIndex === 0}`}
            onClick={() => handleMenuItemClick(0)}
          />
        </Link> */}
        <Link to="/teams">
          <TeamIcon
            active={`${selectedPage === "teams"}`}
            onClick={() => handleMenuItemClick(1,"teams")}
          />
        </Link>
        <Link to="/jointeams">
          <SearchIcon
            active={`${selectedPage === "jointeams"}`}
            onClick={() => handleMenuItemClick(2, "jointeams")}
          />
        </Link>
        <Link to="/attendance">
          <AttendanceIcon
            active={`${selectedPage === "attendance"}`}
            onClick={() => handleMenuItemClick(3, "attendance")}
          />
        </Link>
        <Link to="/settings">
          <SettingIcon
            active={`${selectedPage === "settings"}`}
            onClick={() => handleMenuItemClick(4, "settings")}
          />
        </Link>
        <Link to="/logout">
          <LogoutIcon onClick={() => handleLogout()} />
        </Link>
      </Icons>
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  position: absolute;
  left: -1%;
  width: 60px;
  height: 330px;
  background: radial-gradient(
    100% 249.45% at 0% 2.78%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  z-index: 10;
  @media (max-width: 768px) {
    width: 45px;
    height: 300px;
    border-radius: 12px;
    visibility: ${(props) => (props.sidebarToggle ? "visible" : "hidden")};
  }
`;
// const HomeIcon = styled(Home)`
//   opacity: ${(props) => (props.active === "true" ? 1 : 0.6)};
//   filter: ${(props) =>
//     props.active === "true"
//       ? "drop-shadow(0px 5px 8px rgba(64, 221, 255, 0.6));"
//       : ""};
//   :hover {
//     opacity: 1;
//     transition: opacity 0.5s ease;
//   }
// `;
const TeamIcon = styled(Team)`
  opacity: ${(props) => (props.active === "true" ? 1 : 0.6)};
  filter: ${(props) =>
    props.active === "true"
      ? "drop-shadow(0px 5px 8px rgba(64, 221, 255, 0.6));"
      : ""};
  :hover {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;
const LogoutIcon = styled(Logout)`
  opacity: ${(props) => (props.active === "true" ? 1 : 0.6)};
  filter: ${(props) =>
    props.active === "true"
      ? "drop-shadow(0px 5px 8px rgba(64, 221, 255, 0.6));"
      : ""};
  :hover {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;
const SearchIcon = styled(Search)`
  opacity: ${(props) => (props.active === "true" ? 1 : 0.6)};
  filter: ${(props) =>
    props.active === "true"
      ? "drop-shadow(0px 5px 8px rgba(64, 221, 255, 0.6));"
      : ""};
  :hover {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;
const AttendanceIcon = styled(Attendance)`
  opacity: ${(props) => (props.active === "true" ? 1 : 0.6)};
  filter: ${(props) =>
    props.active === "true"
      ? "drop-shadow(0px 5px 8px rgba(64, 221, 255, 0.6));"
      : ""};
  :hover {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;
const SettingIcon = styled(Setting)`
  opacity: ${(props) => (props.active === "true" ? 1 : 0.6)};
  filter: ${(props) =>
    props.active === "true"
      ? "drop-shadow(0px 5px 8px rgba(64, 221, 255, 0.6));"
      : ""};
  :hover {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;
