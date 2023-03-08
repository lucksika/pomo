import React from 'react'
import Image from 'next/image'
import logo from '../public/pomo_logo.png'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className="w-full h-10 px-3 py-2">
      <Link href="/">
        <div className='flex justify-start gap-2 items-center'>
          <Image src={logo} alt="" className='w-6 h-6'/>
          <span className="text-red-500">pomo</span>
          <span className="text-bluegray-700"> | the pomodoro</span>
        </div>
      </Link>
    </div>
  )
}

export default Header;