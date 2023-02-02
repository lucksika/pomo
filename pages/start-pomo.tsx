import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { NextPage } from "next";
import Head from "next/head";
import CountdownTimer from "@/components/CountdownTimer";

const StartPomo: NextPage = () => {
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>pomo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className="flex w-[800px] flex-1 flex-col items-center justify-center px-20 text-center">
        <CountdownTimer/>
        
      </main>

      <Footer></Footer>
    </div>
  );
};

export default StartPomo;
