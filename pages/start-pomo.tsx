import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { NextPage } from "next";
import Head from "next/head";
import CountdownTimer from "@/components/CountdownTimer";
import { useContext } from "react";
import { PomoContext, PomoProvider } from "context/PomoContext";
import Image from "next/image";
import mascotAct2 from "../public/pomo_mascot_act_2.png"
import mascotAct3 from "../public/pomo_mascot_act_3.png"
// import ActivityCard from "@/components/ActivityCard";


function PomoContent() {

  const { timeLeft, cycle, numFocus, sessionClosed } = useContext(PomoContext)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{`${formatTime(timeLeft)} (${cycle}) - pomo`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className="h-screen w-full lg:py-10 lg:px-20 my-5">
        {/* <ActivityCard/> */}
        <div className="flex lg:w-[800px] sm:w-inherit flex-1 flex-col items-center justify-center text-center lg:m-auto sm:m-0 my-7">
          <Image src={numFocus > 0 && !sessionClosed ? mascotAct3: mascotAct2} alt="" height={200}></Image>
          <CountdownTimer/>
        </div>
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
