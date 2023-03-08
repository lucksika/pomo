import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import profileImage from 'public/only_tomato_logo.png'
import { PomoContext } from "context/PomoContext";
import PomoActivity from "@/utils/pomoActivity";

interface Props {

}

const ActivityCard = ({}: Props) => {
    const pomoActivity = new PomoActivity()
    const [totalPomo, setTotalPomo] = useState(0)
    const [totalFocusTime, setTotalFocusTime] = useState(0)
    const [totalBreakTime, setTotalBreakTime] = useState(0)

    const {
        focusTime, 
        shortbreakTime, 
        longbreakTime, 
        numFocus, 
        cycle, 
        numCycle,
        numFocusPerSession,
        timeLeft } = useContext(PomoContext)

    useEffect(() => {
        updateValues()
    }, [timeLeft])

    
    const updateValues = () => {
        // Total pomo
        setTotalPomo(pomoActivity.calculateTotalPomo(
            cycle,
            timeLeft,
            numFocus,
            numCycle,
            numFocusPerSession
        ))

        // Total time
        if (cycle == 'focus') {
            setTotalFocusTime(totalFocusTime => totalFocusTime + (focusTime - timeLeft))
        } else {
            if (cycle == 'shortbreak') {
                setTotalBreakTime(totalBreakTime => totalBreakTime + (shortbreakTime - timeLeft))
            } else if (cycle == 'longbreak') {
                setTotalBreakTime(totalBreakTime => totalBreakTime + (longbreakTime - timeLeft))
            }
        }
    }

    return (
        <>
        <div className="w-fit flex items-center gap-8 justify-center px-9 py-7 bg-white drop-shadow rounded-lg sm:m-auto min-[300px]:m-auto lg:m-0">
            <div className='flex flex-col items-center justify-center'>
                <Image alt="profile image" src={profileImage} width={55} height={55} className='rounded'></Image>
                <p className='text-md font-semibold'>Peter</p>
            </div>
            <div className='flex flex-col text-left gap-1'>
                <p className='text-2xl font-bold'>Pomodoros: {totalPomo}</p>
                <p className='text-sm'>Focus time: {totalFocusTime}</p>
                <p className='text-sm'>Break time: {totalBreakTime}</p>
            </div>
        </div>
        </>
    )

}

export default ActivityCard