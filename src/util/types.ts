type News = {
  allMarkdownRemark: {
    nodes?: {
      id: string;
      frontmatter: {
        title: string;
        date: string;
        slug: string;
      };
    }[];
  };
};
