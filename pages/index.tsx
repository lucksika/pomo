import type { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link'
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>pomo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex gap-2">
          <button data-testid="get-start-btn" className="text-[#FFFFFF] rounded border-2 border-solid border-pomored bg-pomored py-2 px-4">
            <Link href="/start-pomo">Get started</Link>
          </button>
          <button data-testid="join-room-btn" className="rounded border-2 border-solid border-pomored text-pomored py-2 px-4">
            <Link href="/login">Join room</Link>
          </button>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Home;
