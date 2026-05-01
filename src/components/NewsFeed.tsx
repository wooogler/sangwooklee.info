import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

type Props = {};

dayjs.extend(localizedFormat);

const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

const NewsFeed = (props: Props) => {
  const data = useStaticQuery<News>(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/news/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 3
      ) {
        nodes {
          frontmatter {
            title
            date
            slug
          }
        }
      }
    }
  `);

  const newsNodes = data.allMarkdownRemark?.nodes;

  const jumpToNews = (
    event: React.MouseEvent<HTMLAnchorElement>,
    slug?: string | null
  ) => {
    if (!slug || typeof window === "undefined") return;
    if (normalizePath(window.location.pathname) !== "/news") return;

    const target = document.getElementById(slug);
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", `/news/#${slug}`);
    const offset = 120;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "auto" });
  };

  return (
    <div>
      {newsNodes?.map((node) => {
        const slug = node.frontmatter.slug;

        return (
          <div className='mt-2'>
            <a href={`/news/#${slug}`} onClick={(event) => jumpToNews(event, slug)}>
              <div className='text-sm hover:text-blue-600'>
                {node.frontmatter.title}
              </div>
            </a>
            <div className='text-xs mt-1 italic text-gray-400'>
              {dayjs(node.frontmatter.date).format("ll")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsFeed;
