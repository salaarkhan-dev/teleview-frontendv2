import React from "react";
import styled from "styled-components";

const MeetingMemberView = () => {
  return (
    <MeetingMemberViewContainer>
      <iframe
        allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen"
        msallowfullscreen="msallowfullscreen"
        oallowfullscreen="oallowfullscreen"
        webkitallowfullscreen="webkitallowfullscreen"
        src="https://www.youtube.com/embed/46cXFUzR9XM"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </MeetingMemberViewContainer>
  );
};

export default MeetingMemberView;

const MeetingMemberViewContainer = styled.div`
  display: flex;
  height: inherit;
  flex: 1;
  color: white;
  iframe {
    width: 100%;
  }
`;
