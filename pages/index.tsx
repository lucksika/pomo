import type { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import mascot from '../public/pomo_mascot_act_4.png'
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>pomo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center gap-20">
        <div className="flex flex-row items-end gap-5">
          <span className="text-9xl text-bluegray-700">Pomo it!</span><Image src={mascot} alt="" width={250} height={250}></Image>
        </div>
        <div className="flex gap-8">
          <button data-testid="join-room-btn" className="rounded text-xl font-bold border-2 border-solid border-red-500 text-red-500 py-2 px-4">
            <Link href="/login">Log in</Link>
          </button>
          <button data-testid="get-start-btn" className="text-white text-xl font-bold rounded border-2 border-solid border-red-500 bg-red-500 py-2 px-4">
            <Link href="/start-pomo">Get started</Link>
          </button>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Home;
