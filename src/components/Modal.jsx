import { useSnackbar } from "notistack";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useStore } from "react-redux";
import styled from "styled-components";
import {
  createTeamAsync,
  selectorDropdownValue,
  selectorIsLoading,
} from "../features/teams/teamsSlice";
import Button from "./Button";
import DropDown from "./DropDown";
import TextArea from "./TextArea";
import TextField from "./TextField";
import CustomSpinner from "./CustomSpinner";

const Modal = ({ handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const store = useStore();
  const isLoading = useSelector(selectorIsLoading);
  const selectPrivacy = useSelector(selectorDropdownValue);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    name: "",
    description: "",
    privacy: selectPrivacy,
  });

  React.useEffect(() => {
    setState((state) => ({
      ...state,
      privacy: selectPrivacy,
    }));
  }, [selectPrivacy]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(createTeamAsync(state));
    if (store.getState().teams.isCreated) {
      enqueueSnackbar("Team is created successfully!", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("An error occured while creating team!", {
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
        <h4>Create Team</h4>
      </TitleWrapper>
      <FormWrapper>
        <TextFieldWrapper>
          <TextField
            placeholder="Name"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
          <TextArea
            height="80px"
            placeholder="Description"
            name="description"
            value={state.description}
            onChange={handleChange}
            required
          />
          <DropDown />
        </TextFieldWrapper>
        <ButtonWrapper>
          <Button value="Cancel" onClick={handleClose} className="secondary" />
          {(isLoading && <CustomSpinner />) || (
            <Button value="Create Team" type="submit" onClick={handleSubmit} />
          )}
        </ButtonWrapper>
      </FormWrapper>
    </ModalContainer>
  );
};

export default Modal;

const TitleWrapper = styled.div`
  h4 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #ffffff;

    mix-blend-mode: normal;
    opacity: 0.8;
    margin-top: 8px;
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
  width: 500px;
  height: 400px;
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
  @media (max-width: 480px) {
    width: 380px;
    height: 360px;
    z-index: 1;
  }
`;
