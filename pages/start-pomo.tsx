import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { NextPage } from "next";
import Head from "next/head";
import CountdownTimer from "@/components/CountdownTimer";
import { usePomodoro } from "hooks/usePomodoro";
import { FaPause, FaPlay } from 'react-icons/fa'
import { useEffect, useState } from "react";
import { MdClose } from 'react-icons/md'
import { RxDotFilled } from 'react-icons/rx'

const StartPomo: NextPage = () => {
  const initialPomo = {
    focusTime: 25 * 60,
    shortbreakTime: 5 * 60,
    longbreakTime: 15 * 60
  }

  const formatTime = (timeLeft: number) : string => {
    let formatted = "00:00"
    const minutes = Math.floor((timeLeft % (60 * 60)) / (60))
    const seconds = Math.floor((timeLeft % (60)) / 1)

    formatted = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
    return formatted
  }

  const [
    setPomo, startCounter, pauseCounter, resetCounter, 
    isCounting, sessionClosed, timeLeft, numShortBreak,
    cycle ] = usePomodoro(initialPomo)
  const [disableButton, setDisbleButton] = useState(false)
  const [focusTimeString, setFocusTimeString] = useState(formatTime(initialPomo.focusTime))
  const [shortbreakTimeString, setShortbreakTimeString] = useState(formatTime(initialPomo.shortbreakTime))
  const [longbreakTimeString, setLongbreakTimeString] = useState(formatTime(initialPomo.longbreakTime))

  
  const stringToSeconds = (timeString: string) => {
    let [minutes, seconds] = timeString.split(":")

    return (parseInt(minutes) * 60) + parseInt(seconds)
  }
    
  const isValidTimeFormat = (time: string) => {
    var timeFormat = /^([0-5][0-9]):([0-5][0-9])$/;
    return timeFormat.test(time);
  }

  const onTimerValChange = (event: any) => {
    let val = event.target.value
    setFocusTimeString(val)
    initialPomo.focusTime = stringToSeconds(focusTimeString)

    if (isValidTimeFormat(val)) {
        setDisbleButton(false)
    } else {
        setDisbleButton(true)
    }
  }
  
  const onShortBrealValChange = (event: any) => {
    let val = event.target.value
    setShortbreakTimeString(val)
    initialPomo.shortbreakTime = stringToSeconds(shortbreakTimeString)
  
    if (isValidTimeFormat(val)) {
        setDisbleButton(false)
    } else {
        setDisbleButton(true)
    }
  }
  
  const onLongBrealValChange = (event: any) => {
    let val = event.target.value
    setLongbreakTimeString(val)
    initialPomo.longbreakTime = stringToSeconds(longbreakTimeString)
  
    if (isValidTimeFormat(val)) {
        setDisbleButton(false)
    } else {
        setDisbleButton(true)
    }
  }
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{formatTime(timeLeft)} ({cycle}) - pomo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className="flex w-[800px] flex-1 flex-col items-center justify-center px-20 text-center">
      { sessionClosed ? 
            <div className='flex h-10 w-full'></div> :
            <div className='flex h-10 w-full justify-end'>
                <button onClick={() => resetCounter()} className='flex items-center gap-2 text-pomored '>
                    <MdClose className='w-5 h-5'/>End session
                </button>
            </div>
        }
        <CountdownTimer time={formatTime(timeLeft)}/>
        <div className="flex justify-center gap-2 items-center">
            <div className="flex flex-col justify-start items-start mt-[24px]">
                <span className={`${!sessionClosed && cycle === 'focus' ? 'text-pomored': 'text-pomocaption'}` + " text-xs font-semibold"}>Focus</span>
                <input onChange={onTimerValChange} disabled={!sessionClosed} type="text" placeholder="25:00" maxLength={5} className={`${!sessionClosed ? 'text-pomodisable' : 'text-pomored'}` + " bg-pomobg w-[125px] text-4xl font-semibold"} value={focusTimeString}/>
            </div>
            <div className={"flex flex-col justify-start items-start " + `${numShortBreak > 0 ? "m-0" : "mt-[24px]"}`}>
                { numShortBreak > 0 ? 
                <div className='flex justify-start ml-[-8px] text-pomocaption'>
                    <RxDotFilled className={'text-2xl w-fit ' + `${numShortBreak >= 1 ? 'text-pomored' : 'text-pomocaption'}`}/>
                    <RxDotFilled className={'text-2xl w-fit ' + `${numShortBreak >= 2 ? 'text-pomored' : 'text-pomocaption'}`}/>
                    <RxDotFilled className={'text-2xl w-fit ' + `${numShortBreak >= 3 ? 'text-pomored' : 'text-pomocaption'}`}/>
                    <RxDotFilled className={'text-2xl w-fit ' + `${numShortBreak >= 4 ? 'text-pomored' : 'text-pomocaption'}`}/>
                </div> :
                ''
                }
                
                <span className={`${!sessionClosed && cycle === 'shortbreak' ? 'text-pomored': 'text-pomocaption'}` + " text-xs font-semibold"}>Short Break</span>
                <input onChange={onShortBrealValChange} disabled={!sessionClosed} type="text" placeholder="5:00" maxLength={5} className={`${!sessionClosed ? 'text-pomodisable' : 'text-pomored'}` + " bg-pomobg w-[125px] text-4xl font-semibold"} value={shortbreakTimeString}/>
            </div>
            <div className="flex flex-col justify-start items-start mt-[24px]">
                <span className={`${!sessionClosed && cycle === 'longbreak' ? 'text-pomored': 'text-pomocaption'}` + " text-xs font-semibold"}>Long Break</span>
                <input onChange={onLongBrealValChange} disabled={!sessionClosed} type="text" placeholder="15:00" maxLength={5} className={`${!sessionClosed ? 'text-pomodisable' : 'text-pomored'}` + " bg-pomobg w-[125px] text-4xl font-semibold"} value={longbreakTimeString}/>
             </div>
        </div>
        { isCounting ?
            <button onClick={() => pauseCounter()} className="flex justify-center items-center bg-pomored hover:bg-pomodarkred rounded-full w-12 h-12 disabled:bg-pomodisable mt-[24px]">
                <FaPause className="text-[#FFFFFF] w-5 h-5"></FaPause>
            </button> :
            <button onClick={() => {setPomo(initialPomo); startCounter();}} disabled={disableButton} className="flex justify-center items-center bg-pomored hover:bg-pomodarkred rounded-full w-12 h-12 disabled:bg-pomodisable mt-[24px]">
                <FaPlay className="text-[#FFFFFF] w-5 h-5"></FaPlay>
            </button>
         }
      </main>

      <Footer></Footer>
    </div>
  );
};

export default StartPomo;
