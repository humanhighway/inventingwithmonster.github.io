import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { getSinglePost } from "../utils/selectors";

export default ({ data }) => {
  const { html, title } = getSinglePost(data);

  return (
    <Layout>
      <SEO
        title={title}
        keywords={[
          `matt perry, popmotion, react, pose, framer, framer motion, ui animation`
        ]}
      />
      <div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
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
      }
    }
  }
`;
