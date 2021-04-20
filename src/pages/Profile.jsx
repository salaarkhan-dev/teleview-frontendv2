import React from "react";
import styled from "styled-components";

const Profile = () => {
  return (
    <ProfileContainer>
      <h1 className="page-title">Profile</h1>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  .page-title {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;
  }
`;
