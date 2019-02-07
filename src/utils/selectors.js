export const getPosts = data => data.allMarkdownRemark.edges;

const getId = ({ fields }) => fields.slug;
const getTitle = ({ frontmatter }) => frontmatter.title;
const getDate = ({ frontmatter }) => frontmatter.date;
const getDescription = ({ fields }) => fields.description;

export const getInfo = node => ({
  id: getId(node),
  title: getTitle(node),
  date: getDate(node),
  excerpt: getDescription(node)
});

export const getSinglePost = ({ markdownRemark }) => ({
  id: getId(markdownRemark),
  title: getTitle(markdownRemark),
  date: getDate(markdownRemark),
  author: markdownRemark.frontmatter.author,
  html: markdownRemark.html,
  excerpt: getDescription(markdownRemark)
});
