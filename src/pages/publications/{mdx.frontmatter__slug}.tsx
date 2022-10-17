import { graphql, PageProps } from 'gatsby';
import React from 'react';
import HighlightedText from '../../components/HighlightedText';
import Layout from '../../components/Layout';
import {
  AiOutlineLink,
  AiOutlineFilePdf,
  AiFillGithub,
  AiFillPicture,
} from 'react-icons/ai';
import Utterances from '../../components/Utterances';

const PublicationPage = ({
  data,
  children,
}: PageProps<Queries.PublicationPageQuery>) => {
  const frontmatter = data.mdx?.frontmatter;

  return (
    <Layout>
      <div className='text-2xl font-bold mb-2'>{frontmatter?.title}</div>
      {frontmatter?.author && (
        <HighlightedText text={frontmatter?.author} query='Sangwook Lee' />
      )}
      <div className='flex'>
        {frontmatter?.publication_url && (
          <a
            href={frontmatter?.publication_url}
            className='flex items-center underline mr-2'
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
      <div className='mb-2'>{frontmatter?.conference}</div>
      <div className='prose'>{children}</div>
      <div className='mt-6'>
        <Utterances repo='wooogler/sangwook-lee' />
      </div>
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
      }
    }
  }
`;

export default PublicationPage;
