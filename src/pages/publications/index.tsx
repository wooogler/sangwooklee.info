import { graphql, HeadFC, PageProps } from 'gatsby';
import React from 'react';
import Layout from '../../components/Layout';
import PubItem from '../../components/PubItem';
import { SEO } from '../../components/Seo';

const PublicationsIndexPage = ({
  data,
}: PageProps<Queries.PublicationsIndexPageQuery>) => {
  return (
    <Layout>
      <div className='text-2xl mt-4'>Papers</div>
      <hr className='mb-4' />
      {data.allMdx.nodes
        .filter((node) => node.frontmatter?.format === 'paper')
        .map((node) => (
          <PubItem
            key={node.id}
            title={node.frontmatter?.title ?? null}
            author={node.frontmatter?.author ?? null}
            conference={node.frontmatter?.conference ?? null}
            slug={node.frontmatter?.slug ?? null}
            thumbnail={node.frontmatter?.thumbnail ?? null}
          />
        ))}
      <div className='text-2xl'>Posters</div>
      <hr className='mb-4' />
      {data.allMdx.nodes
        .filter((node) => node.frontmatter?.format === 'poster')
        .map((node) => (
          <PubItem
            key={node.id}
            title={node.frontmatter?.title ?? null}
            author={node.frontmatter?.author ?? null}
            conference={node.frontmatter?.conference ?? null}
            slug={node.frontmatter?.slug ?? null}
            thumbnail={node.frontmatter?.thumbnail ?? null}
          />
        ))}
    </Layout>
  );
};

export const query = graphql`
  query PublicationsIndexPage {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/publications/" } } }
      sort: { frontmatter: { publication_date: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          author
          conference
          slug
          format
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                transformOptions: { fit: COVER, cropFocus: ATTENTION }
              )
            }
          }
        }
      }
    }
  }
`;

export default PublicationsIndexPage;

export const Head: HeadFC = () => <SEO title='Publications' />;
