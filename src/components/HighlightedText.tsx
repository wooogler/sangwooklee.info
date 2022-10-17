import React from 'react';

type Props = {
  text: string;
  query: string;
};

function HighlightedText({ text, query }: Props) {
  if (query !== '' && text && text.includes(query)) {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return (
      <span className='mt-1'>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span className='font-bold' key={index}>
              {part}
            </span>
          ) : (
            <span>{part}</span>
          )
        )}
      </span>
    );
  }

  return <span>{text}</span>;
}

export default HighlightedText;
