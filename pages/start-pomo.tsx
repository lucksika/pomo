import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { NextPage } from "next";
import Head from "next/head";
import CountdownTimer from "@/components/CountdownTimer";
// import { usePomodoro } from "hooks/usePomodoro";
import { useContext } from "react";
import { PomoContext, PomoProvider } from "context/PomoContext";


function PomoContent() {

  const { timeLeft, cycle } = useContext(PomoContext)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{`${formatTime(timeLeft)} (${cycle}) - pomo`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className="flex w-[800px] flex-1 flex-col items-center justify-center px-20 text-center">
        
        <CountdownTimer />
      </main>

      <Footer></Footer>
    </div>
  )
}
const formatTime = (timeLeft: number) : string => {
  let formatted = "00:00"
  const minutes = Math.floor((timeLeft % (60 * 60)) / (60))
  const seconds = Math.floor((timeLeft % (60)) / 1)

  formatted = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
  return formatted
}

const StartPomo: NextPage = () => {
  console.log(">>> start-pomo is rendered")

  return (
    <PomoProvider>
      <PomoContent></PomoContent>
    </PomoProvider>
  );
};

export default StartPomo;
