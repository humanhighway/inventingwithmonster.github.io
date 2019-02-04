import React from "react";
import { ContentContainer } from "./bits";
import ImgMattPerryProfile from "../images/photo-of-matt-perry.jpg";
import styled from "styled-components";
import { media } from "../utils/media";

const Container = styled.div`
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-bottom: 20px;

  p {
    margin-bottom: 10px;
  }
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 20px;
  float: left;

  ${media.phone`
    width: 32px;
    height: 32px;
  `}
`;

export default () => (
  <ContentContainer as="footer">
    <Container>
      <h2>About me</h2>
      <Avatar src={ImgMattPerryProfile} alt="" />
      <p>
        Hey! I’m Matt Perry. I do{" "}
        <a href="https://framer.com">motion @ Framer</a> and take the{" "}
        <a href="https://mattperry.photography">occasional photo</a>.
      </p>
      <p>
        <a href="https://twitter.com/mattgperry">Twitter</a> |{" "}
        <a href="https://github.com/inventingwithmonster">Github</a>
      </p>
    </Container>
  </ContentContainer>
);
