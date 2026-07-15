import './src/styles/global.css';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';

export const wrapRootElement = ({ element }) => {
  return <MDXProvider>{element}</MDXProvider>;
};

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation === null) return;
  const gc = window.goatcounter;
  if (gc && typeof gc.count === 'function') {
    gc.count({
      path: location.pathname + location.search + location.hash,
      event: false,
    });
  }
};
