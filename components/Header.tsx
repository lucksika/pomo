import React from 'react'
import Image from 'next/image'
import logo from '../public/logo.png'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className="w-screen h-10 px-3 py-2">
      <Link href="/">
        <div className='flex justify-start gap-2 items-center'>
          <Image src={logo} alt="" className='w-8 h-8'/>
          <span className="text-pomored">pomo</span>
          <span className="text-pomotext"> | the pomodoro</span>
        </div>
      </Link>
    </div>
  )
}

export default Header;