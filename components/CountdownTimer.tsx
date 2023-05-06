import React, { useContext } from 'react'
import { useState } from "react";
import { PauseIcon, PlayIcon, XMarkIcon } from '@heroicons/react/24/solid';
import redPomo from '../public/pomo_logo.png'
import grayPomo from '../public/pomo_logo_gray.png'
import Image from 'next/image';
import { PomoContext } from "context/PomoContext";

interface Props {

}

const formatTime = (timeLeft: number) => {
    const minutes = Math.floor((timeLeft % (60 * 60)) / (60))
    const seconds = Math.floor((timeLeft % (60)) / 1)

    return String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
}

const ShowCounter = ({formattedTime}: any) => {
    return (
        <div>
            <h1 className="font-medium text-[100px] md:text-[200px] text-bluegray-700 leading-1 md:leading-none">{formattedTime}</h1>
        </div>
    )
}

const TimerController = ({}: any) => {
    const {
        setFocusTime,
        setShortbreakTime,
        setLongbreakTime,
        focusTime, 
        shortbreakTime, 
        longbreakTime, 
        numFocus, 
        sessionClosed, 
        cycle, 
        isCounting,
        pauseCounter, 
        startCounter } = useContext(PomoContext)

    const [disableButton, setDisbleButton] = useState(false)
    const [focusTimeString, setFocusTimeString] = useState(formatTime(focusTime))
    const [shortbreakTimeString, setShortbreakTimeString] = useState(formatTime(shortbreakTime))
    const [longbreakTimeString, setLongbreakTimeString] = useState(formatTime(longbreakTime))
  
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
      setFocusTime(stringToSeconds(val))
  
      if (isValidTimeFormat(val)) {
          setDisbleButton(false)
      } else {
          setDisbleButton(true)
      }
    }
    
    const onShortBrealValChange = (event: any) => {
      let val = event.target.value
      setShortbreakTimeString(val)
      setShortbreakTime(stringToSeconds(val))
    
      if (isValidTimeFormat(val)) {
          setDisbleButton(false)
      } else {
          setDisbleButton(true)
      }
    }
    
    const onLongBrealValChange = (event: any) => {
      let val = event.target.value
      setLongbreakTimeString(val)
      setLongbreakTime(stringToSeconds(val))
    
      if (isValidTimeFormat(val)) {
          setDisbleButton(false)
      } else {
          setDisbleButton(true)
      }
    }
    
    return (
      <>
        <div className="flex justify-center gap-2 items-center">
          <div className={"flex flex-col justify-start items-start " + `${numFocus > 0 && !sessionClosed ? "m-0" : "mt-8"}`}>
            { numFocus > 0 && !sessionClosed ? 
              <div className='flex justify-start gap-2 ml-[-8px] text-bluegray-700 pb-3'>
                <Image alt="" src={numFocus >= 1 ? redPomo : grayPomo} width={20} height={20}></Image>
                <Image alt="" src={numFocus >= 2 ? redPomo : grayPomo} width={20} height={20}></Image>
                <Image alt="" src={numFocus >= 3 ? redPomo : grayPomo} width={20} height={20}></Image>
                <Image alt="" src={numFocus >= 4 ? redPomo : grayPomo} width={20} height={20}></Image>
              </div> :
              ''
              }
              <span className={`${!sessionClosed && cycle === 'focus' ? 'text-red-500': 'text-bluegray-700'}` + " text-xs font-semibold"}>Focus</span>
              <input onChange={onTimerValChange} disabled={!sessionClosed} type="text" placeholder="25:00" maxLength={5} className={`${!sessionClosed ? 'text-gray-400' : 'text-red-500'}` + " bg-white min-[300px]:w-[100px] lg:w-[125px] min-[300px]:text-3xl lg:text-4xl font-semibold"} value={focusTimeString}/>
          </div>
          <div className={"flex flex-col justify-start items-start mt-8"}>
              <span className={`${!sessionClosed && cycle === 'shortbreak' ? 'text-red-500': 'text-bluegray-700'}` + " text-xs font-semibold"}>Short Break</span>
              <input onChange={onShortBrealValChange} disabled={!sessionClosed} type="text" placeholder="5:00" maxLength={5} className={`${!sessionClosed ? 'text-gray-400' : 'text-red-500'}` + " bg-white min-[300px]:w-[100px] lg:w-[125px] min-[300px]:text-3xl lg:text-4xl font-semibold"} value={shortbreakTimeString}/>
          </div>
          <div className="flex flex-col justify-start items-start mt-8">
              <span className={`${!sessionClosed && cycle === 'longbreak' ? 'text-red-500': 'text-bluegray-700'}` + " text-xs font-semibold"}>Long Break</span>
              <input onChange={onLongBrealValChange} disabled={!sessionClosed} type="text" placeholder="15:00" maxLength={5} className={`${!sessionClosed ? 'text-gray-400' : 'text-red-500'}` + " bg-white min-[300px]:w-[100px] lg:w-[125px] min-[300px]:text-3xl lg:text-4xl font-semibold"} value={longbreakTimeString}/>
          </div>
        </div>
          { isCounting ?
              <button onClick={() => pauseCounter()} className="flex justify-center items-center bg-red-500 hover:bg-pomodarkred rounded-full w-12 h-12 disabled:bg-gray-400 mt-8">
                  <PauseIcon className="text-[#FFFFFF] w-5 h-5"></PauseIcon>
              </button> :
              <button onClick={() => startCounter()} disabled={disableButton} className="flex justify-center items-center bg-red-500 hover:bg-pomodarkred rounded-full w-12 h-12 disabled:bg-gray-400 mt-8">
                  <PlayIcon className="text-[#FFFFFF] w-5 h-5"></PlayIcon>
              </button>
           }    
      </>
    )
    
  }

const CountdownTimer =({}: Props) => {
    const {
        timeLeft,
        sessionClosed, 
        resetCounter} = useContext(PomoContext)


    let sessionValue = {
        totalSession: 0,
        totalFocus: 0, // mins
        totalBreak: 0 // mins
    }
    

    return (
        <>
        <ShowCounter
        formattedTime={formatTime(timeLeft)}
        />
        <TimerController/>
        { sessionClosed ? 
            <div className='flex h-10 w-full'></div> :
            <div className='flex h-10 w-full justify-center'>
                <button onClick={() => resetCounter()} className='flex items-center gap-2 text-red-500 '>
                    <XMarkIcon className='w-5 h-5'/>End session
                </button>
            </div>
        }
        </>
    )
    
};

export default CountdownTimer;