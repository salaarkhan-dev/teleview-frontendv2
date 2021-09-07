import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useStore } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { joinTeamsAsync } from "../features/teams/teamsSlice";
import Avatar from "./Avatar";
import Button from "./Button";

const Card = ({ btnValue, name, description, channels, slug, joinable }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const store = useStore();
  const handleClick = async () => {
    try {
      await dispatch(
        joinTeamsAsync({
          slug: slug,
        })
      );
      if (store.getState().teams.isJoined && !store.getState().teams.isSent) {
        enqueueSnackbar("Team joined successfully!", {
          variant: "success",
        });
        history.push(`/teams/${slug}/channels/${channels[0].slug}`);
      } else if (store.getState().teams.isSent) {
        enqueueSnackbar("Request sent successfully!", {
          variant: "success",
        });
      } else if (store.getState().teams.error) {
        enqueueSnackbar(store.getState().teams.error, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        "An error occured while joining team. please try again!",
        {
          variant: "error",
        }
      );
    }
  };
  return (
    <CardContainer>
      <CardWrapper>
        <Avatar />
        <h4>{name ? name.substring(0, 20) + "..." : null}</h4>
        <h5>{description ? description.substring(0, 24) + "..." : null}</h5>
        {joinable ? (
          <Button
            value={btnValue ? btnValue : "Default"}
            onClick={handleClick}
          />
        ) : (
          <Link to={`/teams/${slug}/channels/${channels[0].slug}`}>
            <Button value={btnValue ? btnValue : "Default"} />
          </Link>
        )}
      </CardWrapper>
    </CardContainer>
  );
};

export default Card;

const CardWrapper = styled.div`
  display: flex;
  padding: 15px;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    margin-top: 12px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    color: rgba(255, 255, 255, 0.9);

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  h5 {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.75);
  }
`;
const CardContainer = styled.div`
  width: 300px;
  height: 200px;

  background: linear-gradient(
    241.25deg,
    rgba(41, 39, 85, 0.35) 4.4%,
    rgba(41, 39, 84, 0.78) 61.77%,
    rgba(27, 24, 66, 0.35) 119.94%
  );
  box-shadow: 0px 10px 16px rgba(23, 18, 43, 0.3);
  backdrop-filter: blur(23px);
  border-radius: 10px;

  @media (max-width: 415px) {
    width: 250px;
    height: 170px;
  }
`;
