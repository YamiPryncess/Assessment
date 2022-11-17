import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { filter, map, take } from 'rxjs';
import { Candidate } from 'src/data/candidate.model';
import { Test } from 'src/data/test.model';
import { Session } from 'src/data/session.model';
import { HttpService } from 'src/services/Http.service';
import { TestSession } from 'src/data/testsession.model';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  id!: number;
  candidate = {} as Candidate;
  sessions = [] as Session[];
  tests = [] as Test[];
  assignedSessions = [] as TestSession[];

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
        this.sessions = result.sessions as Session[];
        //console.log(this.candidate);
        this.candidateForm.patchValue(this.candidate);
      });
      this.httpService.getAssignedSessions(this.id).subscribe(results => {
        this.assignedSessions = results as TestSession[];
        console.log(this.assignedSessions);
      })
    });

    this.httpService.getTests().subscribe(results => {
      this.tests = results as Test[];
      //console.log(this.tests);
    })
  }
  
  assignTest(test: Test) {
    
  }

  unassignTest(test: Test) {
    
  }

  onSubmit() {

  }
}
