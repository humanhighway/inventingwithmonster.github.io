import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { graphql } from "gatsby";
import { getSinglePost } from "../../utils/selectors";
import { Title, ContentContainer } from "../../components/bits";
import { Author } from "./Author";

export default ({ data }) => {
  const { html, title, author, date, excerpt } = getSinglePost(data);

  return (
    <Layout>
      <SEO
        title={title}
        description={excerpt}
        keywords={[
          `matt perry`,
          `popmotion`,
          `react`,
          `pose`,
          `popmotion pose`,
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
        description
      }
    }
  }
`;
