import { Pagination } from "@material-ui/lab";
import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import Button from "../components/Button";
import Card from "./../components/Card";
import Modal from "./../components/Modal";

const JoinTeams = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <JoinTeamsContainer fluid="md">
        <HeaderContainer>
          <h1 className="page-title">JoinTeams</h1>
          <ButtonWrapper>
            <Button value="Create Team" onClick={handleOpen} />
          </ButtonWrapper>
        </HeaderContainer>
        <CardWrapper>
          <CardsContainer>
            <Card btnValue="Join Team" />
            <Card btnValue="Join Team" />
            <Card btnValue="Join Team" />
            <Card btnValue="Join Team" />
            <Card btnValue="Join Team" />
            <Card btnValue="Join Team" />
          </CardsContainer>
        </CardWrapper>
        <PaginationWrapper>
          <CustomPagination count={5} page={1} size="small" />
        </PaginationWrapper>
      </JoinTeamsContainer>
      <ModalContainer open={open}>
        <ModalWrapper>
          <Modal handleClose={handleClose} />
        </ModalWrapper>
      </ModalContainer>
    </>
  );
};

export default JoinTeams;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ModalContainer = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  width: 100vw;
  height: 100vh;
`;
const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  position: sticky;
  width: 100%;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: radial-gradient(
    190.41% 252.41% at 0% 2.78%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 10px;
`;
const CustomPagination = styled(Pagination)`
  && {
    width: 100%;
    height: 100%;
    color: #fff;
    .MuiPaginationItem-sizeSmall {
      color: #fff;
      opacity: 0.6;
    }
    .Mui-selected {
      opacity: 1;
      background: linear-gradient(
        135deg,
        #40ddff 0%,
        #14bae3 19.24%,
        #13b1e6 68.64%,
        #11aadf 81.77%,
        #0b98c5 100%
      );
    }
  }
`;
const CardWrapper = styled.div`
  margin-bottom: 30px;

  @media (max-width: 1200px) {
    height: 70%;
    margin-bottom: 8px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const JoinTeamsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  .page-title {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
`;
