const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const handleMarkdown = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const fileNode = getNode(node.parent);
  const slug = createFilePath({ node, getNode, basePath: `pages` });
  createNodeField({
    node,
    name: "slug",
    value: slug
  });
};

const handlers = {
  MarkdownRemark: handleMarkdown
};

exports.onCreateNode = data => {
  if (handlers[data.node.internal.type]) {
    handlers[data.node.internal.type](data);
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug
        }
      });
    });
  });
};
