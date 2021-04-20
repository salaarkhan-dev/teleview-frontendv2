import { Pagination } from "@material-ui/lab";
import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import Card from "./../components/Card";

const Teams = () => {
  return (
    <TeamsContainer fluid="md">
      <HeaderContainer>
        <h1 className="page-title">Teams</h1>
      </HeaderContainer>
      <CardWrapper>
        <CardsContainer>
          <Card btnValue="View Team" />
          <Card btnValue="View Team" />
          <Card btnValue="View Team" />
          <Card btnValue="View Team" />
          <Card btnValue="View Team" />
          <Card btnValue="View Team" />
        </CardsContainer>
      </CardWrapper>
      <PaginationWrapper>
        <CustomPagination count={5} page={1} size="small" />
      </PaginationWrapper>
    </TeamsContainer>
  );
};

export default Teams;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
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

const TeamsContainer = styled(Container)`
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
