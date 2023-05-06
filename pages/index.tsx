import type { NextPage } from "next";
import Head from "next/head";
import CountdownTimer from "@/components/CountdownTimer";
import { useState, useContext } from "react";
import { PomoContext, PomoProvider } from "context/PomoContext";
import Image from "next/image";
import mascotAct2 from "../public/pomo_mascot_act_2.png"
import mascotAct3 from "../public/pomo_mascot_act_3.png"

function PomoContent() {

  const { timeLeft, cycle, numFocus, sessionClosed } = useContext(PomoContext)

  const [isInfoMessageVisible, setIsInfoMessageVisible] = useState(false)
  console.log(isInfoMessageVisible)

  return (
    <>
      <Head>
        <title>{`${formatTime(timeLeft)} (${cycle}) - pomo`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative flex lg:w-[800px] sm:w-inherit flex-1 flex-col items-center justify-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
          className={`${isInfoMessageVisible ? "hidden": "visible"}` + " mt-[-20px] absolute top-0 w-6 h-6 text-bluegray-700 cursor-pointer hover:text-red-500"}
          onClick={() => setIsInfoMessageVisible(true)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        <div className={`${isInfoMessageVisible ? "visible": "hidden" }` + " w-[400px] absolute top-0 mt-[-70px] bg-white p-4 rounded-xl border-2 border-bluegray-700 shadow-md"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
          className="w-5 h-5 right-0 mt-[-10px] mr-1 absolute hover:text-red-500 cursor-pointer"
          onClick={() => setIsInfoMessageVisible(false)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <div className="text-left">
            <p>After four pomodoros, take a longer break.</p>
            <p>"A Pomodoro a day keeps procrastination away!"</p>
          </div>
        </div>
        
        <Image src={numFocus > 0 && !sessionClosed ? mascotAct3: mascotAct2} alt="" height={180}></Image>
        <CountdownTimer/>
      </div>
    </>
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
  return (
    <PomoProvider>
      <PomoContent></PomoContent>
    </PomoProvider>
  );
};

export default StartPomo;
