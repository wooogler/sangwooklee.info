import { Link } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import HighlightedText from './HighlightedText';
import honorableMention from '../images/honorable-mention.png';

type Props = {
  slug?: string | null;
  title?: string | null;
  author?: string | null;
  conference?: string | null;
  award?: string | null;
  under_review?: boolean | null;
  thumbnail?: {
    childImageSharp?: {
      gatsbyImageData: any;
    } | null;
  } | null;
};

const PubItem = (props: Props) => {
  const thumnailImage = getImage(props?.thumbnail as ImageDataLike);

  return (
    <div className='flex items-center my-2 flex-col lg:flex-row border-b border-slate-100'>
      {thumnailImage && (
        <div className='mr-4 lg:w-1/4 h-48 overflow-hidden flex-shrink-0 bg-slate-50'>
          <GatsbyImage
            image={thumnailImage}
            alt={`Thumbnail image of ${props?.title}`}
            className='h-full w-full'
            imgStyle={{ objectFit: 'contain' }}
          />
        </div>
      )}
      <div className='flex flex-1 flex-col mb-4 text-gray-600 mt-4'>
        {props?.award === 'Honorable Mention' && (
          <img
            src={honorableMention}
            alt='Honorable Mention'
            className='h-4 w-auto mb-1 self-start'
          />
        )}
        <Link to={`/publications/${props?.slug}`}>
          <div className='font-extrabold hover:text-blue-500'>
            {props?.title}
          </div>
        </Link>
        {props?.author && (
          <HighlightedText text={props.author} query='Sangwook Lee' />
        )}
        <div className='italic text-sm mt-1'>
          {props?.conference}
          {props?.under_review && (
            <span className='ml-2 px-1.5 py-0.5 text-xs rounded bg-blue-100 text-blue-700 not-italic'>
              Under Review
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PubItem;
