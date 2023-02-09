import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSound from "use-sound";

interface Props {
    _focusTime: number,
    _shortbreakTime: number,
    _longbreakTime: number
}

const usePomodoro = ({
    _focusTime, 
    _shortbreakTime, 
    _longbreakTime
    }: Props) : [
        Dispatch<SetStateAction<number>>,
        Dispatch<SetStateAction<number>>,
        Dispatch<SetStateAction<number>>,
        () => void, 
        () => void, 
        () => void, 
        boolean, 
        boolean, 
        number, 
        number,
        number,
        number,
        number, 
        string
    ] => {
    
    const [focusTime, setFocusTime] = useState(_focusTime)
    const [shortbreakTime, setShortbreakTime] = useState(_shortbreakTime)
    const [longbreakTime, setLongbreakTime] = useState(_longbreakTime)
    const [isCounting, setIsCounting] = useState(false)
    const [timeLeft, setTimeLeft] = useState(_focusTime)
    const [sessionClosed, setSessionClosed] = useState(true)
    const [cycle, setCycle] = useState('focus')
    const [numCycle, setNumCycle] = useState(0)
    const [numFocus, setNumFocus] = useState(0)

    const numFocusPerSession = 4
    const [playStartSound] = useSound('/sounds/startTimer.mp3', {volume: 10})
    const [playPauseSound] = useSound('/sounds/pauseTimer.mp3', {volume: 10})

    const startCycle = (_cycle: string) => {
        if (_cycle === 'focus') {
            playStartSound()
            setTimeLeft(focusTime)
            setCycle('focus')
            setNumFocus(numFocus => numFocus + 1)
        } else if (_cycle === 'shortbreak') {
            playPauseSound()
            setTimeLeft(shortbreakTime)
            setCycle('shortbreak')
        } else if (_cycle === 'longbreak') {
            playPauseSound()
            setTimeLeft(longbreakTime)
            setCycle('longbreak')
        }
    }

    
    const startCounter = () => {
        if (sessionClosed) {
            startCycle('focus')
        }
        setIsCounting(true)
        setSessionClosed(false)
    }
    
    const pauseCounter = () => {
        setIsCounting(false)
    }
    
    const resetCounter = () => {
        setIsCounting(false)
        setSessionClosed(true)
        setTimeLeft(focusTime)
        setCycle('focus')
        setNumFocus(0)
    }

    

    useEffect(() => {
        if (isCounting && timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1)
            }, 1000);

            return () => clearInterval(interval);
        } else if (timeLeft === 0 && !sessionClosed) {
            if (cycle === 'focus') {
                if (numFocus == numFocusPerSession) {
                    startCycle('longbreak')
                } else {
                    startCycle('shortbreak')
                }
            } else if (cycle == 'shortbreak') {
                startCycle('focus')
            } else if (cycle === 'longbreak') {
                setNumFocus(0)
                startCycle('focus')
            }
        }

    }, [timeLeft, isCounting])

    return [
        setFocusTime,
        setShortbreakTime,
        setLongbreakTime,
        startCounter,
        pauseCounter, 
        resetCounter, 
        isCounting, 
        sessionClosed, 
        timeLeft,
        focusTime,
        shortbreakTime,
        longbreakTime,
        numFocus,
        cycle
    ]
}

export { usePomodoro };