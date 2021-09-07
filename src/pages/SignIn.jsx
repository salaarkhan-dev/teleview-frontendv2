import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useSnackbar } from "notistack";
import {
  selectorIsLoading,
  signInAsync,
} from "./../features/authentication/authSlice";
import CustomSpinner from "../components/CustomSpinner";

const SignIn = () => {
  const { enqueueSnackbar } = useSnackbar();
  const isLoading = useSelector(selectorIsLoading);
  const history = useHistory();
  const store = useStore();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signInAsync(state));
      if (store.getState().auth.isAuthenticated) {
        enqueueSnackbar("Signed in successfully!", {
          variant: "success",
        });
        history.push("/dashboard");
      } else {
        enqueueSnackbar("Invalid username or password!", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occured while signing in. please try again!", {
        variant: "error",
      });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };
  return (
    <SignInContainer>
      <SignInForm>
        <h1 className="page-title">SignIn</h1>
        <TextFieldWrapper>
          <TextField
            placeholder="Username"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          <TextField
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </TextFieldWrapper>
        <ButtonWrapper>
          <Link to="/signup">
            <Button value="SignUp" className="secondary" />
          </Link>
          {(isLoading && <CustomSpinner />) || (
            <Button value="SignIn" type="submit" onClick={handleSubmit} />
          )}
        </ButtonWrapper>
      </SignInForm>
    </SignInContainer>
  );
};

export default SignIn;

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
const SignInContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;

  @media (max-width: 768px) {
    width: 320px;
    height: 300px;
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

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 25px;
`;
