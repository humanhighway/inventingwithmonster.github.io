import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.header`
  margin-bottom: 100px;
`;

const Title = styled.h2`
  ${({ theme }) => `
    a {
      color: ${theme.main}
      text-decoration: none;
      text-transform: uppercase;
      font-size: 28px;
    }
  `}
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
