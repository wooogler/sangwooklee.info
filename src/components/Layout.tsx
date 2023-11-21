import { graphql, Link, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { ReactNode } from "react";
import {
  SiLinkedin,
  SiGithub,
  SiTwitter,
  SiGooglescholar,
} from "react-icons/si";
import { useViewport } from "../util/hooks";
import NewsFeed from "./NewsFeed";

type Props = { children: ReactNode };

const Layout = (props: Props) => {
  const data = useStaticQuery(graphql`
    query {
      file(name: { eq: "CV_Sangwook_Lee" }) {
        publicURL
      }
    }
  `);
  const { width } = useViewport();

  return (
    <div className='container mx-auto'>
      <div className='flex flex-row flex-wrap py-4 w-5/6 mx-auto'>
        <nav className='w-full md:w-1/4 px-2'>
          <div className='sticky top-0 p-2 w-full'>
            <div className='flex flex-col overflow-hidden'>
              <StaticImage
                src='../../contents/info/profile.jpg'
                alt="Sangwook's profile image"
                className='mb-4 w-24 md:w-3/5'
              />
              <div>
                <div className='text-lg font-bold'>
                  <Link to='/'>Sangwook Lee</Link>
                </div>
                <div className='text-sm my-2'>
                  HCI, Accessibility, Social Computing, and HAI
                </div>
              </div>
              <div className='flex md:flex-col mt-2'>
                <Link
                  to='/'
                  activeClassName='text-blue-500'
                  className='hover:text-blue-300 mr-2'
                >
                  Home
                </Link>
                <Link
                  to='/publications'
                  activeClassName='text-blue-500'
                  className='hover:text-blue-300 mr-2'
                >
                  Publications
                </Link>
                <Link
                  to='/news'
                  activeClassName='text-blue-500'
                  className='hover:text-blue-300 mr-2'
                >
                  News
                </Link>
                <a
                  href={data.file.publicURL}
                  className='text-red-500 mr-2 underline'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  {(width as number) > 1024 ? "Curriculum Vitae" : "CV"}
                </a>
              </div>
              <div className='mt-4 hidden md:flex'>
                <a
                  href='https://twitter.com/leesang627'
                  target='_blank'
                  rel='noreferrer noopener'
                  className='hover:text-sky-300 text-gray-500 mr-2'
                >
                  <SiTwitter />
                </a>
                <a
                  href='https://www.linkedin.com/in/sangwook-lee/'
                  target='_blank'
                  rel='noreferrer noopener'
                  className='hover:text-blue-500 mr-2 text-gray-500'
                >
                  <SiLinkedin />
                </a>
                <a
                  href='https://scholar.google.com/citations?user=3LmkqCEAAAAJ&hl=en'
                  target='_blank'
                  rel='noreferrer noopener'
                  className='hover:text-black mr-2 text-gray-500'
                >
                  <SiGooglescholar />
                </a>
                <a
                  href='https://github.com/wooogler'
                  target='_blank'
                  rel='noreferrer noopener'
                  className='hover:text-purple-600 text-gray-500'
                >
                  <SiGithub />
                </a>
              </div>
              <div className='mt-4 md:block'>
                <hr className='mb-1' />
                <div className='font-semibold'>News</div>
                <NewsFeed />
                <hr className='mt-2' />
              </div>
            </div>
          </div>
        </nav>
        <main role='main' className='w-full md:w-3/4 pt-1 px-4'>
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
