import { Link } from 'gatsby';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import HighlightedText from './HighlightedText';

type Props = {
  slug?: string;
  title?: string | null;
  author?: string | null;
  conference?: string | null;
  thumbnail?: {
    childImageSharp?: {
      gatsbyImageData: any;
    };
  };
};

const PubItem = (
  props: Queries.HomePageQuery['pubs']['nodes'][0]['frontmatter']
) => {
  const thumnailImage = getImage(props?.thumbnail as ImageDataLike);

  return (
    <div className='flex items-center my-2 flex-col lg:flex-row border-b border-slate-100'>
      {thumnailImage && (
        <div className='mr-4 lg:w-1/4'>
          <GatsbyImage
            image={thumnailImage}
            alt={`Thumbnail image of ${props?.title}`}
          />
        </div>
      )}
      <div className='flex flex-1 flex-col mb-4 text-gray-600 mt-4'>
        <AnchorLink to={`/publications/${props?.slug}#title`}>
          <div className='font-extrabold hover:text-blue-500'>
            {props?.title}
          </div>
        </AnchorLink>
        {props?.author && (
          <HighlightedText text={props.author} query='Sangwook Lee' />
        )}
        <div className='italic text-sm mt-1'>{props?.conference}</div>
      </div>
    </div>
  );
};

export default PubItem;
