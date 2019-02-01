export const getPosts = data => data.allMarkdownRemark.edges;

const getId = ({ fields }) => fields.slug;
const getTitle = ({ frontmatter }) => frontmatter.title;
const getDate = ({ frontmatter }) => frontmatter.date;

export const getInfo = node => ({
  id: getId(node),
  title: getTitle(node),
  date: getDate(node),
  excerpt: node.excerpt
});

export const getSinglePost = ({ markdownRemark }) => ({
  id: getId(markdownRemark),
  title: getTitle(markdownRemark),
  date: getDate(markdownRemark),
  html: markdownRemark.html
});
