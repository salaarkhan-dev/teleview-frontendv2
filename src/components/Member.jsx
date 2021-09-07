import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import Button from "./Button";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  acceptRequestAsync,
  declineRequestAsync,
  removeMemberAsync,
  selectorIsOwner,
} from "../features/teams/teamsSlice";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const Member = ({
  meeting,
  pending,
  team,
  is_owner,
  is_organizer,
  user,
  in_meeting,
  id,
  attentiveness_score,
  expression,
  props,
}) => {
  const isOwner = useSelector(selectorIsOwner);
  const dispatch = useDispatch();
  const store = useStore();
  const { slug } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleRemove = async () => {
    try {
      await dispatch(removeMemberAsync({ slug, id }));
      if (store.getState().teams.isRemove) {
        enqueueSnackbar("Removed Successfully!", {
          variant: "success",
        });
      } else if (store.getState().teams.error) {
        enqueueSnackbar(store.getState().teams.error, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        "An error occured while deleting member. please try again!",
        {
          variant: "error",
        }
      );
    }
  };
  const handleAccept = async () => {
    try {
      await dispatch(acceptRequestAsync({ slug, id }));
      if (
        store.getState().teams.isAccept &&
        !store.getState().teams.isDecline
      ) {
        enqueueSnackbar("Request Accepted!", {
          variant: "success",
        });
        window.location.reload();
      } else if (
        !store.getState().teams.isAccept &&
        store.getState().teams.isDecline
      ) {
        enqueueSnackbar("Request Declined!", {
          variant: "warning",
        });
        window.location.reload();
      } else if (store.getState().teams.error) {
        enqueueSnackbar(store.getState().teams.error, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        "An error occured while accepting the request. please try again!",
        {
          variant: "error",
        }
      );
    }
  };
  const handleDecline = async () => {
    try {
      await dispatch(declineRequestAsync({ slug, id }));
      if (
        store.getState().teams.isAccept &&
        !store.getState().teams.isDecline
      ) {
        enqueueSnackbar("Request Accepted!", {
          variant: "success",
        });
        window.location.reload();
      } else if (
        !store.getState().teams.isAccept &&
        store.getState().teams.isDecline
      ) {
        enqueueSnackbar("Request Declined!", {
          variant: "warning",
        });
        window.location.reload();
      } else if (store.getState().teams.error) {
        enqueueSnackbar(store.getState().teams.error, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        "An error occured while declining the request. please try again!",
        {
          variant: "error",
        }
      );
    }
  };
  return (
    <MemberContainer>
      <Left>
        <Avatar width="50px" height="49px" radius="12px" src={user.avatar} />
      </Left>
      <Right>
        <Top>
          <span>{user.name?.length ? user.name : `@${user.username}`}</span>
        </Top>
        <Bottom>
          {pending ? (
            <>
              <Button
                value="Accept"
                width="60px"
                height="20px"
                radius="6px"
                fontSize="12px"
                onClick={handleAccept}
              />
              <Button
                value="Decline"
                className="secondary"
                width="60px"
                height="20px"
                radius="6px"
                fontSize="12px"
                onClick={handleDecline}
              />
            </>
          ) : null}
          {meeting ? (
            <>
              {is_organizer ? (
                <OwnerBadge>
                  <span>Owner</span>
                </OwnerBadge>
              ) : null}
              {isOwner && !is_organizer ? (
                <>
                  <span style={{ textTransform: "capitalize" }}>
                    {expression?.length > 0 ? expression : "Neutral"}
                  </span>
                  <span>
                    {attentiveness_score
                      ? attentiveness_score.toFixed(0)
                      : "NaN"}
                    %
                  </span>
                  <Button
                    value="Remove"
                    width="60px"
                    height="20px"
                    radius="6px"
                    fontSize="12px"
                  />
                </>
              ) : null}
            </>
          ) : null}

          {team ? (
            <>
              {!is_owner && isOwner && (
                <Button
                  value="Remove"
                  width="60px"
                  height="20px"
                  radius="6px"
                  fontSize="12px"
                  onClick={handleRemove}
                />
              )}

              {is_owner ? (
                <OwnerBadge>
                  <span>Owner</span>
                </OwnerBadge>
              ) : null}

              {in_meeting ? (
                <OwnerBadge>
                  <span>In Meeting</span>
                </OwnerBadge>
              ) : null}
            </>
          ) : null}
        </Bottom>
      </Right>
    </MemberContainer>
  );
};

export default Member;

const OwnerBadge = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 5px;

  background: linear-gradient(136.67deg, #ff409a 8.34%, #c438ef 95.26%);
  box-shadow: 0px 4px 31px #ba1358;
  border-radius: 14px;
  opacity: 1;

  span {
    font-family: Poppins;
    font-style: normal;
    font-weight: 300;
    font-size: 10px;
    color: #fff;
    opacity: 1;
  }
`;
const MemberContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  margin: 5px 0;
`;
const Left = styled.div``;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Top = styled.div`
  span {
    font-family: "Poppins";
    font-style: normal;
    font-size: 14px;
    font-weight: 500;
    color: #b1afcd;
    mix-blend-mode: normal;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px;
`;
