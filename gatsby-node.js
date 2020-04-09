const path = require(`path`);
const moment = require("moment");
const { createFilePath } = require(`gatsby-source-filesystem`);

const handleMarkdown = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const fileNode = getNode(node.parent);
  const slug = createFilePath({ node, getNode, basePath: `pages` });

  createNodeField({
    node,
    name: "slug",
    value: slug,
  });

  createNodeField({
    node,
    name: "author",
    value: node.frontmatter.author || "mattperry",
  });

  createNodeField({
    node,
    name: "description",
    value: node.frontmatter.description,
  });
};

const handlers = {
  Mdx: handleMarkdown,
};

exports.onCreateNode = (data) => {
  if (handlers[data.node.internal.type]) {
    handlers[data.node.internal.type](data);
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);

  const context = {
    ...page.context,
    slug: page.path,
  };

  if (page.context.frontmatter) {
    context.date = moment(`${page.context.frontmatter.date}`).format(
      "DD MMM YYYY"
    );
  }

  createPage({
    ...page,
    context,
  });
};
