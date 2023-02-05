import React, { useEffect } from 'react'
import { useState } from "react";
import { FaPause, FaPlay } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { RxDotFilled } from 'react-icons/rx'
import { useCountdown } from "hooks/useCountdown";

interface Props  {
    time: string
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

const CountdownTimer = ({time}: Props) => {

    const stringToSeconds = (timeString: string) => {
        let [minutes, seconds] = timeString.split(":")
    
        return (parseInt(minutes) * 60) + parseInt(seconds)
    }

    let sessionValue = {
        totalSession: 0,
        totalFocus: 0, // mins
        totalBreak: 0 // mins
    }
    
    const [timerVal, setTimerVal] = useState("00:05")
    const [shortBreakVal, setShortBreakVal] = useState("00:03")
    const [longBreakVal, setLongBreakVal] = useState("00:04")
    const [numShortBreak, setNumShortBreak] = useState(0)
    const [disableButton, setDisbleButton] = useState(false)
    const [isCounting, setIsCounting] = useState(false)
    const [cycle, setCycle] = useState('timer')
    const [numCycle, setNumCycle] = useState(0)
    const [sessionClosed, setSessionClosed] = useState(true)
    const [formattedTime, setFormattedTime] = useState('00:00')
    const [timeLeft, setTimeLeft] = useState(stringToSeconds(formattedTime))
    const numShortBreakPerSession = 4


    useEffect(() => {
        if(isCounting && timeLeft >= 0) {
            const interval = setInterval(() => {
                setFormattedTime(formatTime(timeLeft))
                setTimeLeft(timeLeft => timeLeft - 1)
            }, 1000)

            if (sessionClosed) {
                clearInterval(interval)
            }
            return () => clearInterval(interval)

        } else if (timeLeft < 0 && !sessionClosed) {
            if (cycle === 'timer') {
                setTimeLeft(stringToSeconds(shortBreakVal))
                setCycle('shortbreak')
                setNumShortBreak(numShortBreak => numShortBreak + 1)
            } else if (cycle == 'shortbreak' && numShortBreak < numShortBreakPerSession) {
                setTimeLeft(stringToSeconds(shortBreakVal))
                setNumShortBreak(numShortBreak => numShortBreak + 1)
            }else if (cycle === 'shortbreak' && numShortBreak >= numShortBreakPerSession) {
                setTimeLeft(stringToSeconds(longBreakVal))
                setCycle('longbreak')
                setNumShortBreak(0)
            } else if (cycle === 'longbreak') {
                setTimeLeft(stringToSeconds(timerVal))
                setCycle('timer')
                setNumCycle(numCycle => numCycle + 1)
            }
        }


    }, [isCounting, timeLeft, numShortBreak, formattedTime])

    const isValidTimeFormat = (time: string) => {
        var timeFormat = /^([0-5][0-9]):([0-5][0-9])$/;
        return timeFormat.test(time);
    }
    
    const onTimerValChange = (event: any) => {
        let val = event.target.value
        setTimerVal(val)
        if (isValidTimeFormat(val)) {
            setDisbleButton(false)
        } else {
            setDisbleButton(true)
        }
    }
    
    const onShortBrealValChange = (event: any) => {
    let val = event.target.value
        setShortBreakVal(val)
    
        if (isValidTimeFormat(val)) {
            setDisbleButton(false)
        } else {
            setDisbleButton(true)
        }
    }
    
    const onLongBrealValChange = (event: any) => {
    let val = event.target.value
        setLongBreakVal(val)
    
        if (isValidTimeFormat(val)) {
            setDisbleButton(false)
        } else {
            setDisbleButton(true)
        }
    }

    const startTimer = () => {
        if (sessionClosed) {
            setTimeLeft(stringToSeconds(timerVal))
            setCycle('timer')
        }
        setSessionClosed(false)
        setIsCounting(true)
    }

    const pauseTimer = () => {
        setIsCounting(false)
    }

    const stopTimer = () => {
        // Reset all variables
        setIsCounting(false)
        setSessionClosed(true)
        setCycle('timer')
        setTimerVal('00:05')
        setShortBreakVal('00:03')
        setLongBreakVal('00:04')
        setTimeLeft(stringToSeconds('00:00'))
        setNumShortBreak(0)

        // Save data
        // Save total sessions
        // Save total focus time
        // Save total break time
    }

    return (
        <>
        { numCycle ? 
        <div>Num cycle: {numCycle}</div>:
        <div></div>
        }
        { sessionClosed ? 
            <div className='flex h-10 w-full'></div> :
            <div className='flex h-10 w-full justify-end'>
                <button onClick={stopTimer} className='flex items-center gap-2 text-pomored '>
                    <MdClose className='w-5 h-5'/>End session
                </button>
            </div>
        }
        <ShowCounter
        formattedTime={time}
        />
        {/* <div className="flex justify-center gap-2 items-center">
            <div className="flex flex-col justify-start items-start mt-[24px]">
                <span className={`${!sessionClosed && cycle === 'timer' ? 'text-pomored': 'text-pomocaption'}` + " text-xs font-semibold"}>Focus</span>
                <input onChange={onTimerValChange} disabled={!sessionClosed} type="text" placeholder="25:00" maxLength={5} className={`${!sessionClosed ? 'text-pomodisable' : 'text-pomored'}` + " bg-pomobg w-[125px] text-4xl font-semibold"} value={timerVal}/>
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
                <input onChange={onShortBrealValChange} disabled={!sessionClosed} type="text" placeholder="5:00" maxLength={5} className={`${!sessionClosed ? 'text-pomodisable' : 'text-pomored'}` + " bg-pomobg w-[125px] text-4xl font-semibold"} value={shortBreakVal}/>
            </div>
            <div className="flex flex-col justify-start items-start mt-[24px]">
                <span className={`${!sessionClosed && cycle === 'longbreak' ? 'text-pomored': 'text-pomocaption'}` + " text-xs font-semibold"}>Long Break</span>
                <input onChange={onLongBrealValChange} disabled={!sessionClosed} type="text" placeholder="15:00" maxLength={5} className={`${!sessionClosed ? 'text-pomodisable' : 'text-pomored'}` + " bg-pomobg w-[125px] text-4xl font-semibold"} value={longBreakVal}/>
             </div>
        </div> */}
         {/* { isCounting ?
            <button onClick={pauseTimer} className="flex justify-center items-center bg-pomored hover:bg-pomodarkred rounded-full w-12 h-12 disabled:bg-pomodisable mt-[24px]">
                <FaPause className="text-[#FFFFFF] w-5 h-5"></FaPause>
            </button> :
            <button onClick={startTimer} disabled={disableButton} className="flex justify-center items-center bg-pomored hover:bg-pomodarkred rounded-full w-12 h-12 disabled:bg-pomodisable mt-[24px]">
                <FaPlay className="text-[#FFFFFF] w-5 h-5"></FaPlay>
            </button>
         } */}
          
        </>
    )
    
}

export default CountdownTimer;