import * as React from 'react';
import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import { SEO } from '../components/Seo';
import PubItem from '../components/PubItem';

const HomePage = ({ data }: PageProps<Queries.HomePageQuery>) => {
  return (
    <Layout>
      {data?.intro?.html && (
        <div className='prose prose-h1:text-2xl max-w-none [--tw-prose-bullets:theme(colors.slate.600)]'>
          <div dangerouslySetInnerHTML={{ __html: data.intro.html }} />
          <div className='text-xs text-slate-600 mb-4'>
            Last Update: {data.intro.frontmatter?.date}
          </div>
        </div>
      )}

      <hr className='mb-4' />
      <div className='flex items-baseline justify-between mb-2'>
        <div className='text-2xl'>Highlighted Papers</div>
        <Link to='/publications/' className='text-sm text-slate-600 hover:text-slate-900 underline'>
          View All Publications →
        </Link>
      </div>
      <div>
        {data?.pubs.nodes.map((node) => (
          <PubItem
            key={node.id}
            title={node.frontmatter?.title ?? null}
            author={node.frontmatter?.author ?? null}
            conference={node.frontmatter?.conference ?? null}
            award={node.frontmatter?.award ?? null}
            slug={node.frontmatter?.slug ?? null}
            thumbnail={node.frontmatter?.thumbnail ?? null}
          />
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query HomePage {
    intro: markdownRemark(frontmatter: { title: { eq: "intro" } }) {
      html
      frontmatter {
        date
      }
    }
    pubs: allMdx(
      filter: {
        internal: { contentFilePath: { regex: "/publications/" } }
        frontmatter: { highlighted: { eq: true } }
      }
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
          slug
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

export default HomePage;

export const Head: HeadFC = () => <SEO title='Home Page' />;
