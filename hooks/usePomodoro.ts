import { useEffect, useState } from "react";
import useSound from "use-sound";

interface Props {
    focusTime: number,
    shortbreakTime: number,
    longbreakTime: number
}

const usePomodoro = ({
    focusTime, 
    shortbreakTime, 
    longbreakTime}: Props) : [
        ({
            focusTime, 
            shortbreakTime, 
            longbreakTime
        }: Props) => void, () => void, () => void, () => void, 
        boolean, boolean, number, number, string
    ] => {
    
    const [_focusTime, setFousTime] = useState(focusTime)
    const [_shortbreakTime, setShortbreakTime] = useState(shortbreakTime)
    const [_longbreakTime, setLongbreakTime] = useState(longbreakTime)
    const [isCounting, setIsCounting] = useState(false)
    const [timeLeft, setTimeLeft] = useState(focusTime)
    const [sessionClosed, setSessionClosed] = useState(true)
    const [cycle, setCycle] = useState('focus')
    const [numCycle, setNumCycle] = useState(0)
    const [numShortBreak, setNumShortBreak] = useState(0)

    const numShortBreakPerSession = 4
    const [playStartSound] = useSound('/sounds/startTimer.mp3', {volume: 10})
    const [playPauseSound] = useSound('/sounds/pauseTimer.mp3', {volume: 10})

    const setPomo = ({focusTime, shortbreakTime, longbreakTime}: Props) : void => {
        setFousTime(focusTime)
        setShortbreakTime(shortbreakTime)
        setLongbreakTime(longbreakTime)
    }

    const startCounter = () => {
        if (sessionClosed) {
            playStartSound()
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
    }

    const startCycle = (_cycle: string) => {
        console.log('startCycle ', _cycle)
        if (_cycle === 'focus') {
            playStartSound()
            setTimeLeft(focusTime)
            setCycle('focus')
        } else if (_cycle === 'shortbreak') {
            playPauseSound()
            setTimeLeft(shortbreakTime)
            setCycle('shortbreak')
            setNumShortBreak(numShortBreak => numShortBreak + 1)
        } else if (_cycle === 'longbreak') {
            playPauseSound()
            setTimeLeft(longbreakTime)
            setCycle('longbreak')
            setNumShortBreak(numShortBreak => numShortBreak + 1)
        }
    }

    useEffect(() => {
        if (isCounting && timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1)
            }, 1000);

            return () => clearInterval(interval);
        } else if (timeLeft === 0 && !sessionClosed) {
            if (cycle === 'focus') {
                startCycle('shortbreak')
            } else if (cycle == 'shortbreak' && numShortBreak < numShortBreakPerSession) {
                startCycle('focus')
            }else if (cycle === 'shortbreak' && numShortBreak >= numShortBreakPerSession) {
                startCycle('longbreak')
                setNumShortBreak(0)
            } else if (cycle === 'longbreak') {
                startCycle('focus')
            }
        }

    }, [timeLeft, isCounting])

    return [
        setPomo,
        startCounter,
        pauseCounter, 
        resetCounter, 
        isCounting, 
        sessionClosed, 
        timeLeft,
        numShortBreak,
        cycle
    ]
}

const getReturnValues = (timeLeft: number) => {
    // calculate time left
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    return [minutes, seconds]
}

export { usePomodoro };