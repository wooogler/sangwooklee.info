import './src/styles/global.css';
import type { GatsbyBrowser } from 'gatsby';

// GoatCounter counts the initial page load automatically via count.js.
// Gatsby is a SPA, so client-side navigations don't reload the page; we record
// those as pageviews here. `prevLocation === null` is the initial load, which
// count.js already handled, so we skip it to avoid double-counting.
export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = ({
  location,
  prevLocation,
}) => {
  if (prevLocation === null) return;
  const gc = (window as any).goatcounter;
  if (gc && typeof gc.count === 'function') {
    gc.count({
      path: location.pathname + location.search + location.hash,
      event: false,
    });
  }
};
