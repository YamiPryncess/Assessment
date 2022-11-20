import {Injectable} from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService {
    intervalId?: any;
    finishedFunc?: Function;
    subscription?: Subscription;
    startTime: number = 0;
    endTime: number = 0;
    timeLeft: string = "";

    millisecondsInMinute: number = 60 * 1000;
    millisecondsInSeconds: number = 1000;

    constructor() {
    }

    setCountdown(startTime: number, minutes: number, finishedFunc: Function) {//Count down is per minute.
        this.endTime = startTime + this.minutesToMilliseconds(minutes);
        this.updateCountdown(this.endTime - this.startTime);
        this.finishedFunc = finishedFunc;

        this.subscription = interval(1000).subscribe(x => {
            var now = new Date().getTime();
            var distance = this.endTime - now;
            
            if (distance <= 0) {
                this.finishedFunc!();
                this.subscription!.unsubscribe();
                return;
            }
            
            this.updateCountdown(distance);
         });
    }

    minutesToMilliseconds(minutes: number) {
        return minutes * this.millisecondsInMinute;
    }

    updateCountdown(distance: number) {
        this.timeLeft = Math.floor(distance / this.millisecondsInMinute) + 
            "mins : " + Math.floor(distance / this.millisecondsInSeconds) + "secs";
    }

    stopCountdown() {
        this.subscription!.unsubscribe();
    }
}