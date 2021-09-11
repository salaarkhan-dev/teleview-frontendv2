import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import styled from "styled-components";
import Button from "../components/Button";
import CustomSpinner from "../components/CustomSpinner";
import TextField from "../components/TextField";
import {
  fetchUserAsync,
  selectorSaveUserLoading,
  selectorUser,
  selectorUsername,
  updateUserAsync,
} from "../features/authentication/authSlice";

const Settings = () => {
  const profileRef = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const store = useStore();
  const [profile, setProfile] = React.useState();
  const username = useSelector(selectorUsername);
  const loading = useSelector(selectorSaveUserLoading);
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    name: user?.name,
    email: user?.email,
    bio: user?.bio,
    current_password: "",
    new_password: "",
    status: "available",
    avatar: null,
  });

  React.useEffect(() => {
    async function fetchUser(username) {
      await dispatch(fetchUserAsync(username));
    }

    fetchUser(username);
  }, [username, dispatch]);

  const handleProfile = (e) => {
    e.stopPropagation();
    var file = e.target.files[0];
    setProfile(file);
    setState({
      ...state,
      avatar: file,
    });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    if (state.name.length > 0) formdata.append("name", state.name);
    if (state.bio.length > 0) formdata.append("bio", state.bio);
    if (state.email.length > 0) formdata.append("email", state.email);
    if (state.status.length > 0) formdata.append("status", state.status);
    if (state.avatar !== null) formdata.append("avatar", state.avatar);
    formdata.append("current_password", state.current_password);
    if (state.new_password.length > 0)
      formdata.append("new_password", state.new_password);
    try {
      await dispatch(updateUserAsync({ username, formdata }));
      if (store.getState().auth.isUpdated) {
        enqueueSnackbar("Profile Updated Successfully!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("An error occured while updating profile!", {
          variant: "error",
        });
      }

      setState({
        ...state,
        current_password: "",
      });
    } catch (error) {}
  };
  return (
    <SettingsContainer>
      <h1 className="page-title">Settings</h1>
      <SettingWrapper onSubmit={handleSubmit}>
        <Top>
          <Left>
            <TextField
              placeholder="Name (optional)"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
            <TextField
              placeholder="Current Password*"
              required
              type="password"
              minLength="4"
              name="current_password"
              value={state.current_password}
              onChange={handleChange}
            />
          </Left>
          <Right>
            <TextField
              placeholder="Email  (optional)"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            <TextField
              placeholder="New Password  (optional)"
              type="password"
              minLength="4"
              name="new_password"
              value={state.new_password}
              onChange={handleChange}
            />
          </Right>
        </Top>
        <Bottom>
          <TextField
            placeholder="Bio  (optional)"
            name="bio"
            value={state.bio}
            onChange={handleChange}
          />
          {profile ? (
            <ProfileImage src={URL.createObjectURL(profile)} />
          ) : (
            <ProfileImage src={user?.profilePic} />
          )}
          <ButtonsWrapper>
            <>
              <CustomLabel htmlFor="file-upload" className="primary">
                Upload Profile
              </CustomLabel>
              <input
                id="file-upload"
                type="file"
                accept=".jpg,jpeg,.png"
                ref={profileRef}
                onChange={handleProfile}
                style={{ display: "none" }}
              />
            </>
            {(loading && <CustomSpinner />) || (
              <Button value="Save" type="submit" />
            )}
          </ButtonsWrapper>
        </Bottom>
      </SettingWrapper>
    </SettingsContainer>
  );
};

export default Settings;

const ProfileImage = styled.img`
  height: 180px;
  width: 300px;
  object-fit: contain;
  @media (max-width: 480px) {
    height: 180px;
    width: 250px;
    object-fit: contain;
  }
  @media (max-width: 320px) {
    height: 100px;
    width: 200px;
    object-fit: contain;
  }
`;

const CustomLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: ${({ width }) => (width ? width : "149px")};

  height: ${({ height }) => (height ? height : "34px")};

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "14px")};
  text-align: center;
  color: #fff;
  background: linear-gradient(
    135deg,
    #40ddff 0%,
    #14bae3 19.24%,
    #13b1e6 68.64%,
    #11aadf 81.77%,
    #0b98c5 100%
  );

  border-radius: ${({ radius }) => (radius ? radius : "10px")};
  filter: drop-shadow(1px 4px 15px rgba(130, 197, 212, 0.2));

  &:hover {
    filter: drop-shadow(1px 4px 15px rgba(64, 221, 255, 0.3));
    transition: filter 0.25s ease;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 35px;
    font-size: 12px;
  }
  @media (max-width: 415px) {
    width: 90px;
    height: 35px;
    font-size: 12px;
    border-radius: 7px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    flex-direction: row;
  }
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
const Left = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  justify-content: space-between;
  gap: 20px;
`;
const Right = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: space-between;
  padding-left: 10px;
  gap: 20px;
`;
const SettingWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 50px;
  padding: 0 100px;
  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: flex-start;
    flex: 11;
    margin: 10px 5px;
    padding: 0 0 0 15px;
  }
`;
const SettingsContainer = styled.div`
  width: 100%;
  height: 100%;

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
  }

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
