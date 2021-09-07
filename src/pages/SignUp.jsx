import { useSnackbar } from "notistack";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import CustomSpinner from "./../components/CustomSpinner";
import TextField from "../components/TextField";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  selectorIsLoading,
  signUpAsync,
} from "../features/authentication/authSlice";

const SignUp = () => {
  const isLoading = useSelector(selectorIsLoading);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useStore();
  const [state, setState] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = React.useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const handleConfirmPass = (e) => {
    const value = e.target.value;
    setConfirmPass(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.password === confirmPass) {
      try {
        await dispatch(signUpAsync(state));

        if (store.getState().auth.isSignedUp) {
          enqueueSnackbar("Signed up successfully!", {
            variant: "success",
          });
          history.push("/signin");
        } else {
          enqueueSnackbar("Some problem occured while signing up. try again!", {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar(
          "An error occured while signing in. please try again!",
          {
            variant: "error",
          }
        );
      }
    } else {
      enqueueSnackbar("Password doesn't matched!", {
        variant: "warning",
      });
    }
  };
  return (
    <SignUpContainer>
      <SignUpForm>
        <h1 className="page-title">SignUp</h1>
        <TextFieldWrapper>
          <TextField
            placeholder="Username"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          <TextField
            placeholder="Email"
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <TextField
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <TextField
            placeholder="Confirm Password"
            type="password"
            name="username"
            value={confirmPass}
            onChange={handleConfirmPass}
          />
        </TextFieldWrapper>
        <ButtonWrapper>
          <Link to="/signin">
            <Button value="SignIn" className="secondary" />
          </Link>
          {(isLoading && <CustomSpinner />) || (
            <Button value="SignUp" type="submit" onClick={handleSubmit} />
          )}
        </ButtonWrapper>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 25px;
`;
const SignUpContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 400px;
  @media (max-width: 768px) {
    width: 320px;
    height: 420px;
  }

  background: linear-gradient(
    241.25deg,
    rgba(41, 39, 85, 0.35) 4.4%,
    rgba(41, 39, 84, 0.78) 61.77%,
    rgba(27, 24, 66, 0.35) 119.94%
  );
  box-shadow: 0px 51px 69px rgba(23, 18, 43, 0.585739);
  backdrop-filter: blur(20px);

  border-radius: 10px;
  .page-title {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;
  }
  padding: 35px 25px;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 25px;
`;
