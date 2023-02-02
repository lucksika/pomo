export default class Timer {
    minutes: number
    seconds: number
    isStart: boolean

    constructor(minutes = 0, seconds = 0) {
        this.minutes = 0
        this.seconds = 0
        this.isStart = false
    }

    setupTimer(minutes: number, seconds: number): void {
        this.minutes = minutes
        this.seconds = seconds
    }

    countDown(): void {
        this.isStart = true
        let time = this.minutes * 60 + this.seconds

        let timer = setInterval(() => {
            time = time - 1
    
            if (time < 0) {
                clearInterval(timer)
                this.isStart = false
            }
        }, 1000)
    }

    display(totalSeconds: number): string {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = Math.floor(totalSeconds - (minutes * 60))

        return minutes + ":" + seconds
    }
}
