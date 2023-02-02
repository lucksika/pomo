import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="flex h-10 w-full text-pomocaption font-light items-center justify-center text-sm">
        <a
          className="flex items-center justify-center gap-2"
          href="https://joi-homepage.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Joi
        </a>
      </footer>
  )
}

export default Footer;