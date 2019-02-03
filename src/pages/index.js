import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { getPosts, getInfo } from "../utils/selectors";
import { ContentContainer } from "../components/bits";
import styled from "styled-components";

const Container = styled.div`
  a {
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size: 36px;
    text-transform: uppercase;
    text-decoration: none;
    display: block;
    line-height: 1;
  }
`;

const Date = styled.p`
  margin: 0 0 10px;
  font-size: 14px;
`;

const Summary = styled.p``;

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO
        keywords={[
          `matt perry, popmotion, react, pose, framer, framer motion, ui animation`
        ]}
      />
      <ContentContainer>
        {getPosts(data).map(edge => {
          const { id, title, date, excerpt } = getInfo(edge.node);
          return (
            <Container key={id}>
              <Link to={id}>{title}</Link>
              <Date>{date}</Date>
              <Summary>{excerpt}</Summary>
            </Container>
          );
        })}
      </ContentContainer>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMM YYYY")
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`;
