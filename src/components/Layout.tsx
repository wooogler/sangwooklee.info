import { graphql, Link, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { ReactNode, useState } from "react";
import {
  SiLinkedin,
  SiGithub,
  SiX,
  SiGooglescholar,
} from "react-icons/si";
import { useViewport } from "../util/hooks";
import NewsFeed from "./NewsFeed";
import Travel from "./Travel";
import { AiOutlineFilePdf, AiOutlineMail } from "react-icons/ai";

type Props = { children: ReactNode };

const Layout = (props: Props) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('sangwooklee@vt.edu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const data = useStaticQuery(graphql`
    query {
      file(name: { eq: "CV_Sangwook_Lee" }) {
        publicURL
      }
    }
  `);

  const tagline = (
    <div className='text-sm my-2 leading-relaxed'>
      Ph.D. Candidate @ echolab
      <div className='font-semibold text-[#861F41]'>Virginia Tech</div>
    </div>
  );

  const pageLinks = (
    <>
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
    </>
  );

  const cvLink = (label: string) => (
    <a
      href={data.file.publicURL}
      className='text-red-500 mr-2 underline flex items-center'
      target='_blank'
      rel='noreferrer noopener'
    >
      <span className='mr-1'>{label}</span>
      <AiOutlineFilePdf />
    </a>
  );

  const socialButtons = (
    <>
      <a
        href='https://twitter.com/leesang627'
        target='_blank'
        rel='noreferrer noopener'
        className='hover:text-sky-300 text-gray-500 mr-2'
      >
        <SiX />
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
        className='hover:text-purple-600 mr-2 text-gray-500'
      >
        <SiGithub />
      </a>
      <button
        onClick={copyEmail}
        className='relative hover:text-red-500 text-gray-500 cursor-pointer'
        title='Copy email'
      >
        <AiOutlineMail />
        {copied && (
          <span className='absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white rounded px-1.5 py-0.5 whitespace-nowrap'>
            Copied!
          </span>
        )}
      </button>
    </>
  );

  return (
    <div className='container mx-auto'>
      <div className='flex flex-row flex-wrap py-4 w-full px-4 md:w-5/6 md:px-0 mx-auto'>
        <nav className='w-full md:w-1/4 px-0 md:px-2'>
          <div className='md:hidden pt-4 pb-2'>
            <div className='flex items-stretch justify-between gap-4'>
              <div className='min-w-0 flex-1 flex flex-col'>
                <div className='text-2xl font-bold'>
                  <Link to='/'>Sangwook Lee</Link>
                </div>
                {tagline}
                <div className='flex mt-2 text-xl'>{socialButtons}</div>
                <div className='mt-auto pt-2 space-y-1 text-[17px] leading-none [&_a]:py-1.5'>
                  <div className='flex flex-wrap'>{pageLinks}</div>
                  <div className='flex'>{cvLink('Curriculum Vitae')}</div>
                </div>
              </div>
              <div className='relative w-[36%] max-w-[11rem] flex-shrink-0'>
                <StaticImage
                  src='../../contents/info/profile.jpg'
                  alt="Sangwook's profile image"
                  className='!absolute inset-0 rounded-xl'
                  imgClassName='rounded-xl'
                  objectPosition='50% 30%'
                />
              </div>
            </div>
            <hr className='mt-5 mb-1' />
            <div className='font-semibold'>Travel</div>
            <Travel compact />
            <hr className='mt-4' />
          </div>
          <div className='hidden md:block sticky top-0 p-2 w-full'>
            <div className='flex flex-col overflow-hidden'>
              <StaticImage
                src='../../contents/info/profile.jpg'
                alt="Sangwook's profile image"
                className='mb-4 w-full max-w-[13rem] rounded-xl'
                imgClassName='rounded-xl'
              />
              <div>
                <div className='text-lg font-bold'>
                  <Link to='/'>Sangwook Lee</Link>
                </div>
                {tagline}
              </div>
              <div className='flex flex-col mt-2'>
                {pageLinks}
                {cvLink('CV')}
              </div>
              <div className='mt-4 flex'>{socialButtons}</div>
              <div className='mt-4'>
                <hr className='mb-1' />
                <div className='font-semibold'>Travel</div>
                <Travel />
                <hr className='mt-4 mb-1' />
                <div className='flex justify-between items-center'>
                  <div className='font-semibold'>News</div>
                  <Link
                    to='/news'
                    className='text-xs text-blue-500 hover:text-blue-700 underline'
                  >
                    More
                  </Link>
                </div>
                <NewsFeed />
                <hr className='mt-2' />
              </div>
            </div>
          </div>
        </nav>
        <main role='main' className='w-full md:w-3/4 pt-1 px-0 md:px-4'>
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
