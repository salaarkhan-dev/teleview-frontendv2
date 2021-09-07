import { useSnackbar } from "notistack";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useStore } from "react-redux";
import styled from "styled-components";
import {
  createMeetingAsync,
  selectorIsLoading,
} from "../features/meeting/meetingSlice";
import Button from "./Button";
import TextField from "./TextField";
import CustomSpinner from "./CustomSpinner";
import { useHistory, useLocation } from "react-router";

const CreateMeetingModal = ({ handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const store = useStore();
  const history = useHistory();
  const isLoading = useSelector(selectorIsLoading);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    title: "",
    location: location.pathname,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(createMeetingAsync(state));
    if (store.getState().meeting.isCreated) {
      enqueueSnackbar("Meeting is created successfully!", {
        variant: "success",
      });

      history.push(
        `${state.location}/meeting/${store.getState().meeting.meetingIDs}`
      );
    } else {
      enqueueSnackbar("An error occured while creating Meeting!", {
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
    <ModalContainer>
      <TitleWrapper>
        <h4>Create Meeting</h4>
      </TitleWrapper>
      <FormWrapper>
        <TextFieldWrapper>
          <TextField
            placeholder="Title"
            name="title"
            value={state.title}
            onChange={handleChange}
            required
          />
        </TextFieldWrapper>
        <ButtonWrapper>
          <Button value="Cancel" onClick={handleClose} className="secondary" />
          {(isLoading && <CustomSpinner />) || (
            <Button
              value="Create Meeting"
              type="submit"
              onClick={handleSubmit}
            />
          )}
        </ButtonWrapper>
      </FormWrapper>
    </ModalContainer>
  );
};

export default CreateMeetingModal;

const TitleWrapper = styled.div`
  h4 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #ffffff;

    mix-blend-mode: normal;
    opacity: 0.8;
    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
`;
const FormWrapper = styled.form`
  width: 100%;
  padding: 20px;
`;
const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalContainer = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    241.25deg,
    rgba(41, 39, 85, 0.35) 4.4%,
    rgba(41, 39, 84, 0.78) 61.77%,
    rgba(27, 24, 66, 0.35) 119.94%
  );
  box-shadow: 0px 4px 16px rgba(23, 18, 43, 0.7);
  border-radius: 10px;
`;
