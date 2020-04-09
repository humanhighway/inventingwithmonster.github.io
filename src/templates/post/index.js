import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { Title, ContentContainer } from "../../components/bits";
import { Author } from "./Author";

export default (props) => {
  const { children, pageContext } = props;
  const { date, frontmatter } = pageContext;
  const { title, description, author } = frontmatter;

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        keywords={[
          `matt perry`,
          `popmotion`,
          `react`,
          `pose`,
          `popmotion pose`,
          `framer`,
          `framer motion`,
          `ui animation`,
        ]}
      />
      <article>
        <Title>{title}</Title>
        <ContentContainer>
          <Author id={author} date={date} />
        </ContentContainer>
        <ContentContainer>{children}</ContentContainer>
      </article>
    </Layout>
  );
};
