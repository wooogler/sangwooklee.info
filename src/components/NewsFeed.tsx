import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

type Props = { compact?: boolean };

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
    const offset = 30;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "auto" });
  };

  if (props.compact) {
    return (
      <div className='mt-3 space-y-2'>
        {newsNodes?.map((node) => {
          const slug = node.frontmatter.slug;

          return (
            <a
              key={slug}
              href={`/news/#${slug}`}
              onClick={(event) => jumpToNews(event, slug)}
              className='flex gap-4 text-sm hover:text-blue-600'
            >
              <span className='w-16 flex-shrink-0 text-slate-500'>
                {dayjs(node.frontmatter.date).format("MMM YYYY")}
              </span>
              <span className='text-slate-800'>{node.frontmatter.title}</span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {newsNodes?.map((node) => {
        const slug = node.frontmatter.slug;

        return (
          <div key={slug} className='mt-2'>
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
