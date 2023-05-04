import React from 'react'
import Header from './Header'
import Footer from './Footer'

type Props = {
    children: any
}

const Layout = ({children}: Props) => {
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Header></Header>
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center gap-20">
            <section>{children}</section>
        </main>
        <Footer></Footer>
    </div>
    </>
  )
}

export default Layout