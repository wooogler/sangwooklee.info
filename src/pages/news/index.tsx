import dayjs from "dayjs";
import { graphql, HeadFC, PageProps } from "gatsby";
import React from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Layout from "../../components/Layout";
import { SEO } from "../../components/Seo";

dayjs.extend(localizedFormat);

const NewsPage = (props: PageProps<Queries.NewsPageQuery>) => {
  const nodes = props.data.allMarkdownRemark.nodes;
  return (
    <Layout>
      <div className='text-2xl mt-4'>News</div>
      <hr className='mb-4' />
      <div>
        {nodes.map((node) => {
          return (
            <div className='prose'>
              <div
                className='text-2xl font-bold mb-2'
                id={node.frontmatter?.slug ?? "id"}
              >
                {node.frontmatter?.title}
              </div>
              <div>{dayjs(node.frontmatter?.date).format("ll")}</div>
              {node.html && (
                <div dangerouslySetInnerHTML={{ __html: node.html }} />
              )}
              <hr className='my-4' />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query NewsPage {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/news/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        html
        frontmatter {
          title
          date
          slug
        }
      }
    }
  }
`;

export default NewsPage;

export const Head: HeadFC = () => <SEO title='News' />;
