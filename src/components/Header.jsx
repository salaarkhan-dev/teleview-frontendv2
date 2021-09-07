import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorAvatar,
  selectorIsAuthenticated,
  selectorName,
} from "../features/authentication/authSlice";
import { selectorUsername } from "./../features/authentication/authSlice";
import {
  selectorSidebarToggle,
  sidebarToggler,
} from "../features/sidebar/sidebarSlice";

const Header = () => {
  const isAuthenticated = useSelector(selectorIsAuthenticated);
  const username = useSelector(selectorUsername);
  const name = useSelector(selectorName);
  const avatar = useSelector(selectorAvatar);
  const sidebarToggle = useSelector(selectorSidebarToggle);
  const dispatch = useDispatch();

  const toggleSideBar = () => {
    dispatch(sidebarToggler(sidebarToggle));
  };
  return (
    <HeaderContainer fluid="md">
      <HeaderRow md={12}>
        {isAuthenticated && (
          <Menu onClick={toggleSideBar}>
            <MenuIcon width={20} />
          </Menu>
        )}
        <Col>
          <HeaderLeft>
            <Link to="/">
              <span className="logo-1">TELE</span>
              <span className="logo-2">view</span>
            </Link>
          </HeaderLeft>
        </Col>
        <Col>
          {isAuthenticated && (
            <HeaderRight>
              <Link to="/settings">
                <UserInfo>
                  <h3 style={{ textTransform: "capitalize" }}>{name}</h3>
                  <small style={{ textTransform: "lowercase" }}>
                    @{username}
                  </small>
                </UserInfo>
              </Link>
              <Link to="/settings">
                <Avatar src={avatar} />
              </Link>
            </HeaderRight>
          )}
        </Col>
      </HeaderRow>
    </HeaderContainer>
  );
};

export default Header;

const Menu = styled(Col)`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const HeaderContainer = styled(Container)`
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
`;
const HeaderRow = styled(Row)`
  display: flex;
  align-items: center;
`;
const HeaderLeft = styled.div`
  a:hover {
    text-decoration: none;
  }
  display: flex;
  align-items: center;
  .logo-1 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
  .logo-2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #ffffff;
    opacity: 0.4;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
`;
const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a:hover {
    text-decoration: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-right: 15px;
  cursor: pointer;
  h3 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: #b1afcd;
    mix-blend-mode: normal;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  small {
    font-family: Poppins;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    color: rgba(177, 175, 205, 0.75);
    mix-blend-mode: normal;
    margin-top: -5px;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
`;
