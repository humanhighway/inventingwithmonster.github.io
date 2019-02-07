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

  createNodeField({
    node,
    name: "author",
    value: node.frontmatter.author || "mattperry"
  });

  createNodeField({
    node,
    name: "description",
    value: node.frontmatter.description
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
              author
              description
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/post/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          author: node.fields.author,
          description: node.fields.description
        }
      });
    });
  });
};
