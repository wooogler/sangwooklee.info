import { graphql } from 'gatsby';
import React from 'react';

type Props = {};

const FeedPage = (props: Props) => {
  return <div>FeedPage</div>;
};

export const query = graphql`
  query FeedPage {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/feed/" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          slug
        }
      }
    }
  }
`;

export default FeedPage;
