import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { media } from "../utils/media";

const Container = styled.header`
  margin-bottom: 100px;

  ${media.desktop`margin-bottom: 70px;`}
  ${media.tablet`margin-bottom: 50px;`}
  ${media.phone`margin-bottom: 30px;`}
`;

const Title = styled.h2`
  ${({ theme }) => `
    a {
      color: ${theme.main};
      text-decoration: none;
      text-transform: uppercase;
      font-size: 28px;
    }
  `}

  a {
    ${media.tablet`font-size: 24px;`}
    ${media.phone`font-size: 18px;`}
  }
`;

const Header = ({ siteTitle }) => (
  <Container>
    <Title>
      <Link to="/">{siteTitle}</Link>
    </Title>
  </Container>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
