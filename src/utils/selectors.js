export const getPosts = (data) => data.allMdx.edges;

const getId = ({ fields }) => fields.slug;
const getTitle = ({ frontmatter }) => frontmatter.title;
const getDate = ({ frontmatter }) => frontmatter.date;
const getDescription = ({ fields }) => fields.description;

export const getInfo = (node) => ({
  id: getId(node),
  title: getTitle(node),
  date: getDate(node),
  excerpt: getDescription(node),
});

export const getSinglePost = ({ mdx }) => ({
  id: getId(mdx),
  title: getTitle(mdx),
  date: getDate(mdx),
  author: mdx.frontmatter.author,
  body: mdx.body,
  excerpt: getDescription(mdx),
});
