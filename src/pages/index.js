import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { getPosts, getInfo } from "../utils/selectors";
import { ContentContainer, Title } from "../components/bits";
import styled from "styled-components";
import { media } from "../utils/media";

const HomepageTitle = styled(Title)`
  margin-bottom: 100px;

  ${media.tablet`margin-bottom: 70px;`}
  ${media.phone`margin-bottom: 50px;`}
`;

const Container = styled.div`
  margin-bottom: 60px;

  ${media.tablet`margin-bottom: 40px;`}

  a {
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size: 36px;
    text-transform: uppercase;
    text-decoration: none;
    display: block;
    line-height: 1;

    ${media.tablet`font-size: 28px;`}
    ${media.phone`font-size: 24px;`}
  }
`;

const Date = styled.p`
  margin: 0 0 10px;
  font-size: 14px;
`;

const Summary = styled.p`
  font-size: 18px;
  ${media.tablet`font-size: 16px;`}
`;

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO
        keywords={[
          `matt perry, popmotion, react, pose, framer, framer motion, ui animation`,
        ]}
      />
      <HomepageTitle>{`A blog about motion & UI`}</HomepageTitle>
      <ContentContainer>
        {getPosts(data).map((edge) => {
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMM YYYY")
          }
          fields {
            slug
            description
          }
        }
      }
    }
  }
`;
