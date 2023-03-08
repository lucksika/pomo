export default class PomoActivity {
    totalPomo: number
    totalFocusTime: number
    totalBreakTime: number

    constructor() {
        this.totalPomo = 0
        this.totalFocusTime = 0
        this.totalBreakTime = 0
    }


    calculateTotalPomo(
        cycle: string, 
        timeLeft: number, 
        numFocus: number, 
        numCycle: number,
        numFocusPerSession: number
    ): number {

        if (cycle == 'focus' && timeLeft > 0) {
            numFocus = Math.max(0,numFocus - 1)
        }

        let totalPomo = (numCycle * numFocusPerSession) + numFocus
        // cumulate
        this.totalPomo += totalPomo

        return totalPomo
    }

    calculateTotalFocusTime(
        cycle: string,
        focusTime: number,
        totalPomo: number,
        timeLeft: number
    ): number {
        
        let totalFocusTime = (focusTime * totalPomo)
        if (cycle == 'focus') {
            totalFocusTime += timeLeft
        }

        // cumulate
        this.totalFocusTime += totalFocusTime

        return totalFocusTime
    }

    calculateTotalBreakTime(
        cycle: string,
        shortbreakTime: number,
        longbreakTime: number,
        totalPomo: number,
        numFocusPerSession: number,
        timeLeft: number
    ):number {
        let totalBreakTime = 0
        let longBreakCount = Math.max(0, Math.ceil(totalPomo/numFocusPerSession) - 1)
        let shortBreakCount = totalPomo - longBreakCount - 1

        let totalShortbreak = shortbreakTime * Math.max(0, shortBreakCount)
        let totalLongbreak = longbreakTime * Math.max(0, longBreakCount)
        
        totalBreakTime += totalShortbreak + totalLongbreak

        if (cycle == 'shortbreak') {
            totalBreakTime += (shortbreakTime - timeLeft)
        } else if (cycle == 'longbreak') {
            totalBreakTime += (longbreakTime - timeLeft)
        }

        this.totalBreakTime += totalBreakTime

        return totalBreakTime
    }

    
}