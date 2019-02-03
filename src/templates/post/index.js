import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { graphql } from "gatsby";
import { getSinglePost } from "../../utils/selectors";
import styled from "styled-components";
import { ContentContainer } from "../../components/bits";
import { Author } from "./Author";

const Title = styled.h1`
  color: #32005c;
  font-size: 72px;
  font-weight: 900;
  letter-spacing: -1px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 50px;
`;

export default ({ data }) => {
  const { html, title, author, date } = getSinglePost(data);

  return (
    <Layout>
      <SEO
        title={title}
        keywords={[
          `matt perry`,
          `popmotion`,
          `react`,
          `pose`,
          `framer`,
          `framer motion`,
          `ui animation`
        ]}
      />
      <article>
        <Title>{title}</Title>
        <ContentContainer>
          <Author id={author} date={date} />
        </ContentContainer>
        <ContentContainer dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
      }
      fields {
        slug
        author
      }
    }
  }
`;
