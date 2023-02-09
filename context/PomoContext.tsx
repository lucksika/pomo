import { usePomodoro } from "hooks/usePomodoro";
import { createContext, Dispatch, SetStateAction} from "react";

interface IThemeContext {
    setFocusTime: Dispatch<SetStateAction<number>>,
    setShortbreakTime: Dispatch<SetStateAction<number>>,
    setLongbreakTime: Dispatch<SetStateAction<number>>,
    startCounter: () => void, 
    pauseCounter: () => void, 
    resetCounter: () => void, 
    isCounting: boolean, 
    sessionClosed: boolean, 
    timeLeft: number, 
    focusTime: number,
    shortbreakTime: number,
    longbreakTime: number,
    numFocus: number,
    cycle: string
};
  
const defaultState = {
    setFocusTime: () => {} ,
    setShortbreakTime: () => {},
    setLongbreakTime: () => {},
    startCounter: () => {}, 
    pauseCounter: () => {}, 
    resetCounter: () => {}, 
    isCounting: false, 
    sessionClosed: true, 
    timeLeft: 0,
    focusTime: 0,
    shortbreakTime: 0,
    longbreakTime: 0, 
    numFocus: 0,
    cycle: ''
}
  
const PomoContext = createContext<IThemeContext>(defaultState)
  
function PomoProvider({ children }: any) {
    const initialPomo = {
        _focusTime: 25 * 60,
        _shortbreakTime: 5 * 60,
        _longbreakTime: 15 * 60
    }

    const [
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
        cycle ] = usePomodoro(initialPomo)


    return (
        <PomoContext.Provider
        value={{
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
        }}
        >
        {children}
        </PomoContext.Provider>
    )
}
  
export { PomoContext, PomoProvider }
