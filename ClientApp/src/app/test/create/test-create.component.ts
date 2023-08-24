import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SubmitMode} from 'src/enums/submit-mode.enum';
import {Candidate} from 'src/models/candidate.model';
import {HttpService} from 'src/services/http.service';
import {MessageService} from "primeng/api";
import {CandidateStatus} from "../../../enums/candidate-status.enum";
import {Test} from "../../../models/test.model";

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.css']
})
export class TestCreateComponent implements OnInit {
  attemptedSubmit: boolean = false;

  testForm = this.fb.group({
    name: ['', [Validators.required]],
    questionsAsked: [{value: 0, disabled: true}],
    minutes: [0, [Validators.min(.1)]],
    questions: this.fb.array([new FormGroup({
      text: new FormControl(''),
      image: new FormControl(''),
      index: new FormControl(0)
    })])
  });

  constructor(private fb: FormBuilder, private httpService : HttpService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {

  }

  addQuestion(): void {
    const newGroup = this.fb.group({
        text: '',
        image: '',
        index: this.testForm.controls.questions.length
    });
    this.testForm.controls.questions.push(newGroup);
  }

  removeQuestion(): void {
    if(this.testForm.controls.questions.length > 1) {
      this.testForm.controls.questions.removeAt(this.testForm.controls.questions.length - 1);
    }
  }

  //Adding validators for question text on question's array of form groups
  //gives me trouble pushing new questions to the array. That's why
  //I'm validating questions individually here till that's figured out.
  validQuestions(): boolean {
    let questions = this.testForm.value.questions;
    let valid : boolean = true;
    if(questions) {
      for(let i = 0; i < questions.length; i++) {
        if(questions[i].text == '') {
          valid = false;
        }
      }
    }
    return valid;
  }

  onSubmit(): void {
    this.attemptedSubmit = true;
    if(!this.testForm.controls.minutes.valid) {
      this.messageService.add({severity:'error', summary:'Error!', detail:'Test must be at least "0.1" minutes (6 seconds) long.'});
    } else if(this.testForm.valid && this.validQuestions()) {
      this.httpService.postTest(this.testForm.value as Test).subscribe(x => this.router.navigate(['/test']));
    }
  }

}
