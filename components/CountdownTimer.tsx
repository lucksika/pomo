import React, { useEffect, memo, Dispatch, SetStateAction, useContext } from 'react'
import { useState } from "react";
import { FaPause, FaPlay } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { GiTomato } from 'react-icons/gi'
import { PomoContext, PomoProvider } from "context/PomoContext";

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
            <h1 className="font-semibold text-[200px] text-pomotext" data-testid="timer">{formattedTime}</h1>
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
          <div className={"flex flex-col justify-start items-start " + `${numFocus > 0 && !sessionClosed ? "m-0" : "mt-[24px]"}`}>
            { numFocus > 0 && !sessionClosed ? 
              <div className='flex justify-start ml-[-8px] text-pomocaption'>
                  <GiTomato className={'text-2xl w-fit ' + `${numFocus >= 1 ? 'text-pomored' : 'text-pomocaption'}`}/>
                  <GiTomato className={'text-2xl w-fit ' + `${numFocus >= 2 ? 'text-pomored' : 'text-pomocaption'}`}/>
                  <GiTomato className={'text-2xl w-fit ' + `${numFocus >= 3 ? 'text-pomored' : 'text-pomocaption'}`}/>
                  <GiTomato className={'text-2xl w-fit ' + `${numFocus >= 4 ? 'text-pomored' : 'text-pomocaption'}`}/>
              </div> :
              ''
              }
              <span className={`${!sessionClosed && cycle === 'focus' ? 'text-pomored': 'text-pomocaption'}` + " text-xs font-semibold"}>Focus</span>
              <input onChange={onTimerValChange} disabled={!sessionClosed} type="text" placeholder="25:00" maxLength={5} className={`${!sessionClosed ? 'text-pomodisable' : 'text-pomored'}` + " bg-pomobg w-[125px] text-4xl font-semibold"} value={focusTimeString}/>
          </div>
          <div className={"flex flex-col justify-start items-start mt-[24px]"}>
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
              <button onClick={() => startCounter()} disabled={disableButton} className="flex justify-center items-center bg-pomored hover:bg-pomodarkred rounded-full w-12 h-12 disabled:bg-pomodisable mt-[24px]">
                  <FaPlay className="text-[#FFFFFF] w-5 h-5"></FaPlay>
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
        { sessionClosed ? 
            <div className='flex h-10 w-full'></div> :
            <div className='flex h-10 w-full justify-end'>
                <button onClick={() => resetCounter()} className='flex items-center gap-2 text-pomored '>
                    <MdClose className='w-5 h-5'/>End session
                </button>
            </div>
        }
        <ShowCounter
        formattedTime={formatTime(timeLeft)}
        />
        <TimerController/>
        </>
    )
    
};

export default CountdownTimer;