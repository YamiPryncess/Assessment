import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { TestState } from 'src/enums/test-state.enum';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { Session } from 'src/models/session.model';
import { Test } from 'src/models/test.model';
import { HttpService } from 'src/services/http.service';
import { TimerService } from 'src/services/timer.service';
import { SessionStatus } from 'src/enums/session-status.enum';
import { EndingMethod } from 'src/enums/ending-method.enum';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  guid: string = "";
  session = {} as Session;
  tests = [] as Test[];
  questions = [] as Question[];
  answers: FormArray = this.fb.array([]);

  testState: TestState = TestState.Initialize;
  readonly testStates = TestState;
  timer: TimerService;
  displayModal: boolean = false;

  constructor(private httpService : HttpService, private fb: FormBuilder, private _timer: TimerService, private route: ActivatedRoute) {
    this.timer = _timer;
  }

  @HostListener('window:beforeunload')
  saveProgress() {
    this.session.answers = this.textArrayToAnswerModel();
    this.checkAndSetEnd(EndingMethod.BrowserClose);
    this.httpService.putSession(this.session);
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.guid = params.guid;
      this.httpService.getSessionByGuid(this.guid).pipe(take(1)).subscribe(results => {
        this.session = results as Session;
        this.answers.patchValue(this.answerModelToTextArray());
        if(this.session.status === SessionStatus.Assigned) {
          this.testState = TestState.StartScreen;
        } else if(this.session.status === SessionStatus.Started && this.checkAndSetEnd(EndingMethod.FutureBrowserLoad)) {
          this.httpService.putSession(this.session);
        } else if(this.session.status === SessionStatus.Started) {
            this.testState = TestState.DoTest;
            this.startTest(this.timer.minutesToMilliseconds(this.session.test.minutes) - (Date.now() - this.session.createdDateTime.getTime()));
        } else {
          this.testState = TestState.TestFinished;
        }
        console.log(this.session);
      });
    });
  }

  startTest(startTime: number = Date.now(), minutes: number = .25) {
    this.testState = TestState.DoTest;
    this.timer.setCountdown(startTime, minutes, () => {
      this.onSubmit(EndingMethod.TimeExpired);
    });
    if(this.session.startTime == void(0) || this.session.status == SessionStatus.Assigned) {
      this.session.startTime = new Date(startTime);
      this.session.status = SessionStatus.Started;
      this.httpService.putSession(this.session);
    }
  }

  answerModelToTextArray() {
    let latestAnswers = [] as string[];
    for(let i = 0; i < this.questions.length; i++) {
      latestAnswers.push(this.session.answers[i].text as string);
    }
    return latestAnswers;
  }

  textArrayToAnswerModel() {
    let latestAnswers = [] as Answer[];
    for(let i = 0; i < this.questions.length; i++) {
      latestAnswers.push({
        text: this.answers.value[i],
        session: this.session,
        question: this.questions[i],
        sessionId: this.session.id,
        questionId: this.questions[i].id
      } as Answer);
    }
    return latestAnswers;
  }

  checkAndSetEnd(endMethod: EndingMethod) {
    if(Date.now() >= this.timer.endTime) {
      this.session.endTime = new Date(this.timer.endTime);
      this.session.endMethod = endMethod;
      return true;
    }
    return false;
  }

  onSubmit(endingMethod: EndingMethod = EndingMethod.ManualSubmission) {
    this.testState = TestState.TestFinished;
    this.timer.stopCountdown();
    this.showModalDialog();
    console.log(this.answers.value);
    this.session.answers = this.textArrayToAnswerModel();
    this.checkAndSetEnd(endingMethod);
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