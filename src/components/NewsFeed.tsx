import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { graphql, useStaticQuery } from 'gatsby';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import React from 'react';

type Props = {};

dayjs.extend(localizedFormat);

const NewsFeed = (props: Props) => {
  const data = useStaticQuery<News>(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/news/" } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          frontmatter {
            title
            date
            slug
          }
        }
      }
    }
  `);

  return (
    <div>
      {data.allMarkdownRemark?.nodes?.map((node) => {
        return (
          <div className='mt-2'>
            <AnchorLink to={`/news#${node.frontmatter.slug}`}>
              <div className='text-sm hover:text-blue-600'>
                {node.frontmatter.title}
              </div>
            </AnchorLink>
            <div className='text-xs mt-1'>
              {dayjs(node.frontmatter.date).format('ll')}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsFeed;
