import React, { useEffect } from 'react'
import { useState } from "react";
import { FaPause, FaPlay } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { useCountdown } from "hooks/useCountdown";

type Props = {}

const ExpiredNotice = () => {
    return (
        <div>
            <span>Expired!!!</span>
        </div>
    )
}

const formatTime = (timeLeft: number) => {
    const minutes = Math.floor((timeLeft % (60 * 60)) / (60))
    const seconds = Math.floor((timeLeft % (60)) / 1)

    return { minutes, seconds }
}

const ShowCounter = ({timeLeft}: any) => {
    let { minutes, seconds } = formatTime(timeLeft)
    
    return (
        <div>
            <h1 className="font-bold text-[200px] text-pomotext" data-testid="timer">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</h1>
        </div>
    )
}

const CountdownTimer = ({}: Props) => {
    const stringToSeconds = (timeString: string) => {
        let [minutes, seconds] = timeString.split(":")
    
        return (parseInt(minutes) * 60) + parseInt(seconds)
    }

    const [timerVal, setTimerVal] = useState("25:00")
    const [shortBreakVal, setShortBreakVal] = useState("05:00")
    const [longBreakVal, setLongBreakVal] = useState("15:00")
    const [disableButton, setDisbleButton] = useState(false)
    const [isCounting, setIsCounting] = useState(false)
    const [cycle, setCycle] = useState('timer')
    const [numCycle, setNumCycle] = useState(0)
    const [sessionClosed, setSessionClosed] = useState(true)
    const [timeLeft, setTimeLeft] = useState(stringToSeconds("00:00"))


    useEffect(() => {
        if(isCounting && timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1)
            }, 1000)

            if (sessionClosed) {
                clearInterval(interval)
            }
            return () => clearInterval(interval)

        } else if (timeLeft === 0 && !sessionClosed) {
            if (cycle === 'timer') {
                setTimeLeft(stringToSeconds(shortBreakVal))
                setCycle('shortbreak')
            } else if (cycle === 'shortbreak') {
                setTimeLeft(stringToSeconds(longBreakVal))
                setCycle('longbreak')
            } else if (cycle === 'longbreak') {
                setTimeLeft(stringToSeconds(timerVal))
                setCycle('timer')
                setNumCycle(numCycle => numCycle + 1)
            }
        }
    }, [isCounting, timeLeft])

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
        setIsCounting(false)
        setSessionClosed(true)
        setCycle('timer')
        setTimerVal('25:00')
        setShortBreakVal('05:00')
        setLongBreakVal('15:00')
        setTimeLeft(stringToSeconds('00:00'))
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
        timeLeft={timeLeft}
        />
        <div className="flex justify-center gap-2 items-center">
          <div className="flex flex-col justify-start items-start">
            <span className={`${!sessionClosed && cycle === 'timer' ? 'text-pomored': 'text-pomocaption'}` + " text-sm font-semibold"}>Timer</span>
            <input onChange={onTimerValChange} disabled={!sessionClosed} type="text" placeholder="25:00" maxLength={5} className={`${!sessionClosed ? 'text-pomodisable' : 'text-pomored'}` + " bg-pomobg w-[125px] text-4xl font-bold"} value={timerVal}/>
          </div>
          <div className="flex flex-col justify-start items-start">
            <span className={`${!sessionClosed && cycle === 'shortbreak' ? 'text-pomored': 'text-pomocaption'}` + " text-sm font-semibold"}>Short Break</span>
            <input onChange={onShortBrealValChange} disabled={!sessionClosed} type="text" placeholder="5:00" maxLength={5} className={`${!sessionClosed ? 'text-pomodisable' : 'text-pomored'}` + " bg-pomobg w-[125px] text-4xl font-bold"} value={shortBreakVal}/>
          </div>
          <div className="flex flex-col justify-start items-start">
            <span className={`${!sessionClosed && cycle === 'longbreak' ? 'text-pomored': 'text-pomocaption'}` + " text-sm font-semibold"}>Long Break</span>
            <input onChange={onLongBrealValChange} disabled={!sessionClosed} type="text" placeholder="15:00" maxLength={5} className={`${!sessionClosed ? 'text-pomodisable' : 'text-pomored'}` + " bg-pomobg w-[125px] text-4xl font-bold"} value={longBreakVal}/>
          </div>
         
         { isCounting ?
                <button onClick={pauseTimer} className="flex justify-center items-center bg-pomored hover:bg-pomodarkred rounded-full w-12 h-12 disabled:bg-pomodisable">
                    <FaPause className="text-[#FFFFFF] w-5 h-5"></FaPause>
                </button> :
                <button onClick={startTimer} disabled={disableButton} className="flex justify-center items-center bg-pomored hover:bg-pomodarkred rounded-full w-12 h-12 disabled:bg-pomodisable">
                    <FaPlay className="text-[#FFFFFF] w-5 h-5"></FaPlay>
                </button>
         }
          
        </div>
        </>
    )
    
}

export default CountdownTimer;