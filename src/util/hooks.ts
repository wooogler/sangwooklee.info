import { graphql, useStaticQuery } from 'gatsby';
import { useEffect, useState } from 'react';

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          image
          twitterUsername
          siteUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export const useViewport = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' && window.innerWidth
  );

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Return the width so we can use it in our components
  return { width };
};
