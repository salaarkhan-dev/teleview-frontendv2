import styled from "styled-components";
import React from "react";
import { Skeleton } from "@material-ui/lab";

function PostSkeleton({ width, type }) {
  return (
    <PostSkeletonContainer type={type}>
      <Skeleton animation="wave" variant="circle" width={55} height={55} />
      <Skeleton animation="wave" width={width} height={100} />
    </PostSkeletonContainer>
  );
}

export default PostSkeleton;

const PostSkeletonContainer = styled.div`
  display: flex;
  flex-direction: ${({ type }) => (type === "sent" ? "row-reverse" : "row")};
  align-items: center;
  gap: 25px;
`;
