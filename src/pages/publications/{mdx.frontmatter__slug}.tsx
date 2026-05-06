import { graphql, HeadFC, HeadProps, PageProps } from "gatsby";
import React from "react";
import HighlightedText from "../../components/HighlightedText";
import Layout from "../../components/Layout";
import {
  AiOutlineLink,
  AiOutlineFilePdf,
  AiFillGithub,
  AiFillPicture,
} from "react-icons/ai";
import { BsGearWideConnected } from "react-icons/bs";
import honorableMention from "../../images/honorable-mention.png";
import Utterances from "../../components/Utterances";
import { SEO } from "../../components/Seo";

const PublicationPage = ({
  data,
  children,
}: PageProps<Queries.PublicationPageQuery>) => {
  const frontmatter = data.mdx?.frontmatter;

  return (
    <Layout>
      <div className='prose max-w-none'>
        <div className='text-2xl font-bold mb-2' id='title'>
          {frontmatter?.title}
        </div>
        {frontmatter?.author && (
          <HighlightedText text={frontmatter?.author} query='Sangwook Lee' />
        )}
        <div className='mb-2 flex items-center gap-2'>
          {frontmatter?.conference}
          {(frontmatter as any)?.under_review && (
            <span className='px-1.5 py-0.5 text-xs rounded bg-blue-100 text-blue-700'>
              Under Review
            </span>
          )}
        </div>
        {frontmatter?.award === 'Honorable Mention' && (
          <img
            src={honorableMention}
            alt='Honorable Mention'
            className='h-5 w-auto mb-2'
          />
        )}
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
            className='flex items-center underline mr-2'
            target='_blank'
            rel='noreferrer noopener'
          >
            <BsGearWideConnected />
            Demo
            {frontmatter?.demo_label && (
              <span className='ml-1 px-1.5 py-0.5 text-xs rounded bg-amber-100 text-amber-800 no-underline'>
                {frontmatter.demo_label}
              </span>
            )}
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

      <div className='prose max-w-none'>{children}</div>
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
        award
        under_review
        publication_date
        publication_url
        title
        paper_pdf {
          publicURL
        }
        poster_pdf {
          publicURL
        }
        demo_url
        demo_label
        github_url
        slug
        thumbnail {
          publicURL
        }
      }
    }
  }
`;

export default PublicationPage;

export const Head: HeadFC<Queries.PublicationPageQuery> = ({ data }) => {
  const frontmatter = data.mdx?.frontmatter;
  const thumbnail = (frontmatter as any)?.thumbnail?.publicURL;
  return (
    <SEO
      title={`Publications - ${frontmatter?.slug}`}
      description={frontmatter?.title || undefined}
      image={thumbnail || undefined}
    />
  );
};
