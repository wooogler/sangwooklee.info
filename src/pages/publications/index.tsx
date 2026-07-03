import { graphql, HeadFC, PageProps } from 'gatsby';
import React from 'react';
import Layout from '../../components/Layout';
import PubItem from '../../components/PubItem';
import { SEO } from '../../components/Seo';

const PublicationsIndexPage = ({
  data,
}: PageProps<Queries.PublicationsIndexPageQuery>) => {
  const papers = data.allMdx.nodes.filter(
    (node) => node.frontmatter?.format === 'paper'
  );
  const theses = data.allMdx.nodes.filter(
    (node) => node.frontmatter?.format === 'thesis'
  );
  const posters = data.allMdx.nodes.filter(
    (node) => node.frontmatter?.format === 'poster'
  );

  return (
    <Layout>
      <div className='text-2xl mt-4'>Refereed Journals and Conference Proceedings</div>
      <hr className='mb-4' />
      {papers.map((node) => (
        <PubItem
          key={node.id}
          title={node.frontmatter?.title ?? null}
          author={node.frontmatter?.author ?? null}
          conference={node.frontmatter?.conference ?? null}
          award={node.frontmatter?.award ?? null}
          under_review={node.frontmatter?.under_review ?? null}
          review_status={node.frontmatter?.review_status ?? null}
          slug={node.frontmatter?.slug ?? null}
          thumbnail={node.frontmatter?.thumbnail ?? null}
        />
      ))}
      <div className='text-2xl mt-4'>Thesis</div>
      <hr className='mb-4' />
      {theses.map((node) => (
        <PubItem
          key={node.id}
          title={node.frontmatter?.title ?? null}
          author={node.frontmatter?.author ?? null}
          conference={node.frontmatter?.conference ?? null}
          award={node.frontmatter?.award ?? null}
          under_review={node.frontmatter?.under_review ?? null}
          review_status={node.frontmatter?.review_status ?? null}
          slug={node.frontmatter?.slug ?? null}
          thumbnail={node.frontmatter?.thumbnail ?? null}
        />
      ))}
      <div className='text-2xl mt-4'>Lightly Reviewed Papers — Posters, Notes, and Workshop Papers</div>
      <hr className='mb-4' />
      {posters.map((node) => (
        <PubItem
          key={node.id}
          title={node.frontmatter?.title ?? null}
          author={node.frontmatter?.author ?? null}
          conference={node.frontmatter?.conference ?? null}
          award={node.frontmatter?.award ?? null}
          under_review={node.frontmatter?.under_review ?? null}
          review_status={node.frontmatter?.review_status ?? null}
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
          award
          under_review
          review_status
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
