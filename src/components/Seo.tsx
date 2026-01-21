import React, { ReactNode } from 'react';
import { useSiteMetadata } from '../util/hooks';

type Props = {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  children?: ReactNode;
};

export const SEO = ({ title, description, pathname, image, children }: Props) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  };

  return (
    <>
      <title>Sangwook Lee - {seo.title}</title>
      <meta name='description' content={seo.description} />
      <meta name='image' content={seo.image} />

      {/* Open Graph */}
      <meta property='og:title' content={seo.title} />
      <meta property='og:description' content={seo.description} />
      <meta property='og:image' content={seo.image} />
      <meta property='og:url' content={seo.url} />
      <meta property='og:type' content='website' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={seo.title} />
      <meta name='twitter:url' content={seo.url} />
      <meta name='twitter:description' content={seo.description} />
      <meta name='twitter:image' content={seo.image} />
      <meta name='twitter:creator' content={seo.twitterUsername} />
      {children}
    </>
  );
};
