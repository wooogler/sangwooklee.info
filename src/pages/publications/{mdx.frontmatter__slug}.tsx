import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import React from 'react';
import HighlightedText from '../../components/HighlightedText';
import Layout from '../../components/Layout';
import {
  AiOutlineLink,
  AiOutlineFilePdf,
  AiFillGithub,
  AiFillPicture,
} from 'react-icons/ai';
import { BsGearWideConnected } from 'react-icons/bs';
import Utterances from '../../components/Utterances';
import { SEO } from '../../components/Seo';

const PublicationPage = ({
  data,
  children,
}: PageProps<Queries.PublicationPageQuery>) => {
  const frontmatter = data.mdx?.frontmatter;

  return (
    <Layout>
      <div className='prose'>
        <div className='text-2xl font-bold mb-2' id='title'>
          {frontmatter?.title}
        </div>
        {frontmatter?.author && (
          <HighlightedText text={frontmatter?.author} query='Sangwook Lee' />
        )}
        <div className='mb-2'>{frontmatter?.conference}</div>
      </div>
      <div className='flex mb-6'>
        {frontmatter?.publication_url && (
          <a
            href={frontmatter?.publication_url}
            className='flex items-center underline mr-2 text-gray-600'
            target='_blank'
            rel='noreferrer noopener'
          >
            <AiOutlineLink /> Link
          </a>
        )}

        {frontmatter?.paper_pdf?.publicURL && (
          <a
            href={frontmatter?.paper_pdf.publicURL}
            download
            className='flex items-center text-red-600 underline mr-2'
          >
            <AiOutlineFilePdf />
            Paper
          </a>
        )}
        {frontmatter?.poster_pdf?.publicURL && (
          <a
            href={frontmatter?.poster_pdf.publicURL}
            download
            className='flex items-center text-red-800 underline mr-2'
          >
            <AiFillPicture />
            Poster
          </a>
        )}
        {frontmatter?.demo_url && (
          <a
            href={frontmatter?.demo_url}
            download
            className='flex items-center underline'
          >
            <BsGearWideConnected />
            Demo
          </a>
        )}
        {frontmatter?.github_url && (
          <a
            href={frontmatter?.github_url}
            download
            className='flex items-center text-purple-600 underline'
          >
            <AiFillGithub />
            Code
          </a>
        )}
      </div>

      <div className='prose'>{children}</div>
    </Layout>
  );
};

export const query = graphql`
  query PublicationPage($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        author
        conference
        publication_date
        publication_url
        title
        paper_pdf {
          publicURL
        }
        poster_pdf {
          publicURL
        }
        github_url
        slug
      }
    }
  }
`;

export default PublicationPage;

export const Head: HeadFC<Queries.PublicationPageQuery> = ({ data }) => (
  <SEO title={`Publications - ${data.mdx?.frontmatter?.slug}`} />
);
