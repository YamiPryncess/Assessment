import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { take } from 'rxjs';
import { Candidate } from 'src/data/candidate.model';
import { Test } from 'src/data/test.model';
import { TestResult } from 'src/data/testResults.model';
import { HttpService } from 'src/services/Http.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  id!: number;
  candidate = {} as Candidate;
  testResults = [] as TestResult[];
  tests= [] as Test[];
  candidateForm = this.fb.group({
    id: [{value: null as number|null, disabled: true}, [Validators.required]],
    createdDateTime: [{value: null as Date|null, disabled: true}, [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    ssn: ['', [Validators.required]],
    dob: [null as Date|null],
    email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    source1: ['', [Validators.required]],
    source2: [''],
    desiredJobTitle: ['', [Validators.required]],
    backgroundCheckAuthorizationTimestampET: [null as Date|null],
    backgroundCheckLevel: [''],
    driversLicenseState: [''],
    driversLicenseNumber: [''],
    status: ['', [Validators.required]],
    createdBy: [{value: '', disabled: true}]
  });

  constructor(private httpService : HttpService, private route: ActivatedRoute, private fb: FormBuilder) {}
  
  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.httpService.getCandidate(this.id).pipe(take(1)).subscribe(
        result => {
        this.candidate = result as Candidate;
        this.testResults = result.testResults as TestResult[];
        console.log(this.candidate);
        this.candidateForm.patchValue(this.candidate);
      });
    });
    this.httpService.getTests().pipe(take(1)).subscribe(
      result => {
      this.tests = result as Test[];
    });
  }

  assignTest(test: TestResult) {

  }

  onSubmit() {

  }
}
