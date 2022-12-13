import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { DateTime } from 'luxon';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { Session } from 'src/models/session.model';
import { Test } from 'src/models/test.model';
import { HttpService } from 'src/services/http.service';
import { TimerService } from 'src/services/timer.service';
import { SessionStatus } from 'src/enums/session-status.enum';
import { EndingMethod } from 'src/enums/ending-method.enum';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  guid: string = "";
  session = {} as Session;
  answers: FormArray = this.fb.array([]);
  readonly statuses = SessionStatus;
  timer: TimerService;
  displayModal: boolean = false;

  constructor(private httpService : HttpService, private fb: FormBuilder, private _timer: TimerService, private route: ActivatedRoute) {
    this.timer = _timer;
  }

  @HostListener('window:beforeunload', ['$event'])
  async saveProgress($event: Event) {
    if(this.session.status === SessionStatus.Started){
      this.updateAnswers();
      this.checkAndUpdateEnd(this.timer.endTime, false, true);
      await this.httpService.putSession(this.session).subscribe();
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.guid = params.guid;
      this.httpService.getSessionByGuid(this.guid).pipe(take(1)).subscribe(results => {
        this.session = results as Session;
        this.getAnswers();
        switch(this.session.status) {
          case SessionStatus.Started:
            this.timer.setTime(DateTime.now().valueOf(), this.timer.remainingTime(DateTime.fromISO(String(this.session.startTime)).valueOf(), this.session.test.minutes));
            if(this.checkAndUpdateEnd(this.timer.endTime)) {
              this.showModalDialog();
              this.httpService.putSession(this.session);
            } else {
              this.timer.startCountdown(() => {
                this.onSubmit(false);
              });
            }
            break;
          case SessionStatus.Finished:
            this.showModalDialog();
            break;
        }
      });
    });
  }

  startTest() {
    let startTime = DateTime.now();
    if(this.session.startTime == void(0) || this.session.status == SessionStatus.Assigned) {
      this.session.startTime = startTime;
      this.session.status = SessionStatus.Started;
      this.session.endMethod = EndingMethod.NotEnded;
      this.httpService.putSession(this.session);
    }
    this.timer.setTime(startTime.valueOf(), this.session.test.minutes);
    this.timer.startCountdown(() => {
      this.onSubmit(false);
    });
  }

  getAnswers() {
    for(let i = 0; i < this.session.test.questions.length; i++) {
      let value = this.session.answers.length - 1 >= i ? this.session.answers[i].text : "";
        this.answers.push(new FormControl(value, Validators.required));
    }
  }

  updateAnswers() {
    let latestAnswers = [] as Answer[];
    for(let i = 0; i < this.session.test.questions.length; i++) {
      latestAnswers.push({
        text: this.answers.value[i],
        sessionId: this.session.id,
        questionId: this.session.test.questions[i].id
      } as Answer);
    }
    this.session.answers = latestAnswers;
  }

  checkAndUpdateEnd(endTime: number, submitted: boolean = false, browserClose: boolean = false) {
    let expired : boolean = Date.now() >= endTime ? true : false;
    
    if(submitted) {
      this.session.endTime = DateTime.fromMillis(endTime);
      this.session.endMethod = EndingMethod.ManualSubmission;
      this.session.status = SessionStatus.Finished;
      return true;
    } else if(this.session.endMethod === EndingMethod.BrowserClose && expired) {
      this.session.status = SessionStatus.Finished;
      return true;
    } else if(expired) {
      this.session.endTime = DateTime.fromMillis(endTime);
      this.session.endMethod = EndingMethod.TimeExpired;
      this.session.status = SessionStatus.Finished;
      return true;
    } else if(browserClose && !expired) {
      this.session.endTime = DateTime.fromMillis(endTime);
      this.session.endMethod = EndingMethod.BrowserClose;
      return false;
    }
    return false;
  }

  onSubmit(manualSubmission: boolean = true) {
    this.timer.stopCountdown();
    this.showModalDialog();
    this.updateAnswers();
    this.checkAndUpdateEnd(this.timer.endTime, manualSubmission);
    this.httpService.putSession(this.session);
  }

  showModalDialog() {
    this.displayModal = true;
  }
}

  // setAnswerAmount(value: number) {
  //   while(this.answers.length < value) {
  //     this.answers.push(new FormControl('', Validators.required));
  //   }
  //   while(this.answers.length > value) {
  //     this.answers.removeAt(this.answers.length-1);
  //   }
  // }