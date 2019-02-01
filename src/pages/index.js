import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { getPosts, getInfo } from "../utils/selectors";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO
        keywords={[
          `matt perry, popmotion, react, pose, framer, framer motion, ui animation`
        ]}
      />
      {getPosts(data).map(edge => {
        const { id, title, date, excerpt } = getInfo(edge.node);
        return (
          <div key={id}>
            <Link to={id}>{title}</Link>
            <span>{date}</span>
            <p>{excerpt}</p>
          </div>
        );
      })}
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
