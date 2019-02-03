import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "./header";
import Footer from "./footer";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { siteTheme } from "./themes.js";
import { media } from "../utils/media";
import "./layout.css";

const GlobalStyle = createGlobalStyle`
  {${({ theme }) => `
    body {
      padding: 10px;
      background: linear-gradient(180deg, ${theme.main}, ${theme.secondary});
      min-height: 100vh;

      > * {
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 400;
      }

      a {
        color: ${theme.action};
      }
  
      h1, h1 *, h2, h2 *, h3, h4, h5, h6 {
        font-family: 'Raleway', sans-serif;
        font-weight: 900;
        line-height: 0.8;
      }
    }
  `}}
`;

const Container = styled.div`
  ${({ theme }) => `background: ${theme.background};`}
  min-height: calc(100vh - 20px);
  padding: 30px;

  ${media.tablet`padding: 20px;`}
  ${media.phone`padding: 10px;`}
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={siteTheme}>
        <Container>
          <GlobalStyle />
          <Header siteTitle={data.site.siteMetadata.title} />
          {children}
          <Footer />
        </Container>
      </ThemeProvider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
