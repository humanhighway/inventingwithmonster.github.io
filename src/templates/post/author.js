import React from "react";
import ImgMattPerryProfile from "../../images/photo-of-matt-perry.jpg";
import styled from "styled-components";
import { media } from "../../utils/media";

const authors = {
  mattperry: {
    img: ImgMattPerryProfile,
    name: "Matt Perry"
  }
};

const Container = styled.div`
  display: flex !important;
  align-items: center;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;

  ${media.phone`
    width: 32px;
    height: 32px;
  `}
`;

const Name = styled.span`
  font-weight: 600;
`;

const Seperator = styled.span`
  margin: 0 10px;
`;

export const Author = ({ id = "mattperry", date }) => {
  if (!authors[id]) return null;

  return (
    <Container>
      <Avatar src={authors[id].img} alt="" />
      <Name>{authors[id].name}</Name>
      <Seperator>{`|`}</Seperator>
      {date}
    </Container>
  );
};
