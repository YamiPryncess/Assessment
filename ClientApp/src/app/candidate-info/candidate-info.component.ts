import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubmitMode } from 'src/enums/submit-mode.enum';
import { Candidate } from 'src/models/candidate.model';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.css']
})
export class CandidateInfoComponent implements OnInit {
  @Input() hideCreateInfo: boolean = true;
  @Input() submitMode: SubmitMode = SubmitMode.Create;
  private candidate = {} as Candidate;
  initialPatch: boolean = false;
  
  candidateForm = this.fb.group({
    id: [{value: null as number|null, disabled: true}, [Validators.required]],
    createdDateTime: [{value: null as Date|null, disabled: true}, [Validators.required]],
    createdBy: [{value: '', disabled: true}],
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
    status: ['', [Validators.required]]
  });
  
  constructor(private fb: FormBuilder, private httpService : HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  updateForm(candidate: Candidate) {
    this.candidate = candidate;
    if(!this.initialPatch) {
      this.candidateForm.patchValue(candidate);
      this.initialPatch = true;
    }
  }

  onSubmit() {
    if(this.submitMode == SubmitMode.Create) {
      this.httpService.postCandidate(this.candidateForm.value as Candidate).subscribe(result => this.router.navigate(['/']));
    } else if (this.submitMode == SubmitMode.Update) {
      let result = this.candidateForm.value;
      result.id = this.candidate.id;
      result.createdDateTime = this.candidate.createdDateTime;
      result.createdBy = this.candidate.createdBy;
      
      this.httpService.putCandidate(result as Candidate).subscribe(result => console.log(result));
    }
  }
}