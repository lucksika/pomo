import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="flex h-10 w-full text-pomocaption font-light items-center justify-center text-sm text-gray-400">
        <span>Designed and Developed by&nbsp;</span>
        <a
          className="flex items-center justify-center gap-2 hover:underline hover:text-red-500"
          href="https://joi-homepage.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
        Joi.
        </a>
      </footer>
  )
}

export default Footer;