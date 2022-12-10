import {Injectable} from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService {
    intervalId?: any;
    finishedFunc?: Function;
    subscription?: Subscription;
    startTime: number = 0;
    endTime: number = 0;
    totalMinutes: number = 0;
    timeLeft: string = "";

    millisecondsInMinute: number = 60 * 1000;
    millisecondsInSeconds: number = 1000;

    constructor() {
    }

    setTime(startTime: number, minutes: number) {
        this.totalMinutes = minutes;
        this.startTime = startTime;
        this.endTime = startTime + this.minutesToMilliseconds(minutes);
        
        this.updateCountdown(this.endTime - this.startTime);
    }

    startCountdown(finishedFunc: Function) {//Count down is per minute.
        this.finishedFunc = finishedFunc;

        this.subscription = interval(1000).subscribe(x => {
            var distance = (this.endTime - Date.now()) + 100;
            
            if (distance <= 0) {
                this.finishedFunc!();
                this.subscription!.unsubscribe();
                return;
            }
            
            this.updateCountdown(distance);
            console.log(distance);
         });
    }

    currentTimeSince(since: number) {
        console.log("now since: ", Date.now(), " - ", since, " = ", Date.now() - since);
        return Date.now() - since;
    }

    minutesMinusMilliseconds(minutes: number, subtractor: number) {
        console.log("minusMilli: ", this.millisecondsToMinutes(this.minutesToMilliseconds(minutes) - subtractor));
        return this.millisecondsToMinutes(this.minutesToMilliseconds(minutes) - subtractor);
    }

    minutesToMilliseconds(minutes: number) {
        return minutes * this.millisecondsInMinute;
    }

    millisecondsToMinutes(minutes: number) {
        return minutes / this.millisecondsInMinute;
    }

    updateCountdown(distance: number) {
        let mins = Math.floor(distance / this.millisecondsInMinute);
        let totalSecs = Math.floor(distance / this.millisecondsInSeconds);
        let secs = totalSecs % 60;
        this.timeLeft = mins + "mins : " + secs + "secs";
    }

    stopCountdown() {
        this.subscription!.unsubscribe();
    }
}