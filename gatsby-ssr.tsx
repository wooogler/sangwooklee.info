import React from 'react';
import type { GatsbySSR } from 'gatsby';

// GoatCounter analytics (privacy-friendly, cookieless).
// The code below (`sangwooklee`) is the GoatCounter site code; register it at
// https://www.goatcounter.com/ so that https://sangwooklee.goatcounter.com is your dashboard.
// If you choose a different code at signup, update the URL here to match.
export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents([
    <script
      key='goatcounter'
      data-goatcounter='https://sangwooklee.goatcounter.com/count'
      async
      src='//gc.zgo.at/count.js'
    />,
  ]);
};
