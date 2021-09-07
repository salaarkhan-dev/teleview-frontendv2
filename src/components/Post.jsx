import React from "react";
import Avatar from "./Avatar";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectorUsername } from "../features/authentication/authSlice";
import { MEDIA_URL } from "../api/endpoints";

const Post = ({ creator, content, created_at, files }) => {
  const username = useSelector(selectorUsername);
  const isOwnPost =
    creator.username.toUpperCase() === username.toUpperCase() ? true : false;

  // function renderSwitch(ext) {
  //   switch (ext) {
  //     case "jpg":
  //       return <PostImage src={files} alt="img" width="50px" height="50px" />;
  //     case "png":
  //       return <PostImage src={files} alt="img" width="50px" height="50px" />;
  //     case "jpeg":
  //       return <PostImage src={files} alt="img" width="50px" height="50px" />;
  //     default:
  //       break;
  //   }
  // }

  return (
    <PostContainer postType={isOwnPost}>
      <PostContentContainer>
        <TopWrapper postType={isOwnPost}>
          <h3>{creator.name ? creator.name : `@${creator.username}`}</h3>
          <h4>
            {new Date(created_at).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })}
          </h4>
        </TopWrapper>
        <PostContentWrapper postType={isOwnPost}>
          <PostWrapper postType={isOwnPost}>
            <PostContent>
              <h6>{content}</h6>
            </PostContent>
            {files ? (
              <PostFiles>
                <FilesLink href={files} download>
                  {files.substring(files.lastIndexOf("/") + 1)}
                </FilesLink>
                {/* {renderSwitch(files.substring(files.lastIndexOf(".") + 1))} */}
              </PostFiles>
            ) : null}
            <TimeWrapper>
              <h4>
                {new Date(created_at).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </h4>
            </TimeWrapper>
          </PostWrapper>
          <PostAvatar
            src={
              creator.avatar.includes("http")
                ? creator.avatar
                : `${MEDIA_URL}${creator.avatar}`
            }
          />
        </PostContentWrapper>
      </PostContentContainer>
    </PostContainer>
  );
};

export default Post;

// const PostImage = styled.img`
//   width: 300px;
//   height: 200px;
//   object-fit: cover;
//   border-radius: 5px;

//   @media (max-width: 768px) {
//     width: 200px;
//     height: 150px;
//   }
//   @media (max-width: 480px) {
//     width: 150px;
//     height: 100px;
//   }
// `;

const FilesLink = styled.a`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  color: #ffffff;
  :hover {
    color: rgba(255, 255, 255, 0.6);
  }
  @media (max-width: 480px) {
    font-size: 8px;
  }
`;
const PostAvatar = styled(Avatar)`
  @media (max-width: 480px) {
    /* display: none; */
  }
`;
const PostFiles = styled.div`
  margin: 5px;
  width: 100%;
`;
const PostWrapper = styled.div`
  width: auto;
  height: auto;
  min-width: 300px;
  max-width: 400px;
  padding: 6px 8px;

  @media (max-width: 990px) {
    width: auto;
  }
  @media (max-width: 768px) {
    min-width: 100px;
    max-width: 250px;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 10px;
  ${({ postType }) =>
    postType
      ? `background: radial-gradient(
          100% 249.45% at 0% 2.78%,
           rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0) 100%
            );
            border: 2px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            border-radius: 16px 16px 0px 16px;
            `
      : `background: linear-gradient(
    135deg,
    #40ddff 0%,
    #14bae3 19.24%,
    #13b1e6 68.64%,
    #11aadf 81.77%,
    #0b98c5 100%
  );
  box-shadow: 1px 4px 15px rgba(64, 221, 255, 0.35);
  border-radius: 16px 16px 16px 0px;`};

  @media (max-width: 480px) {
    ${({ postType }) =>
      postType
        ? `border-radius: 14px 14px 0px 14px;`
        : `border-radius: 14px 14px 14px 0px;`};
  }
`;
const PostContainer = styled.div`
  display: flex;
  flex-direction: ${({ postType }) => (postType ? "row-reverse" : "row")};
  align-items: center;
  gap: 20px;
  margin: 15px 0;
`;
const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const PostContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-direction: ${({ postType }) => (postType ? "row" : "row-reverse")};
`;

const PostContent = styled.div`
  width: 100%;
  height: 100%;
  h6 {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    word-wrap: break-word;
    font-size: 14px;
    opacity: 0.8;
    color: #ffffff;

    @media (max-width: 990px) {
      font-size: 12px;
    }
    @media (max-width: 768px) {
      font-size: 10px;
    }
    @media (max-width: 630px) {
      font-size: 8px;
    }
    @media (max-width: 480px) {
      font-size: 10px;
    }
  }
`;
const TimeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  h4 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 300;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.9);

    mix-blend-mode: normal;

    @media (max-width: 990px) {
      font-size: 9px;
    }
    @media (max-width: 768px) {
      font-size: 9px;
    }
    @media (max-width: 630px) {
      font-size: 8px;
    }
  }
`;
const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;

  h3 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: #ffffff;
    text-transform: capitalize;
    margin-left: 5px;

    @media (max-width: 990px) {
      font-size: 12px;
    }
    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
  h4 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    color: #ffffff;
    text-transform: capitalize;

    @media (max-width: 990px) {
      font-size: 10px;
    }
    @media (max-width: 768px) {
      font-size: 8px;
    }
  }
`;
