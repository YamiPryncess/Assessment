import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Candidate } from 'src/data/candidate.model';
import { HttpService } from 'src/services/Http.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  id!: number;
  candidate = {} as Candidate;
  candidateForm = this.fb.group({
    id: [{value: '', disabled: true}, [Validators.required]],
    createdDateTime: [{value: '', disabled: true}, [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    ssn: ['', [Validators.required]],
    dob: [''],
    email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    source1: ['', [Validators.required]],
    source2: [''],
    desiredJobTitle: ['', [Validators.required]],
    backgroundCheckAuthorizationTimestampET: [''],
    backgroundCheckLevel: [''],
    driversLicenseState: [''],
    driversLicenseNumber: [''],
    status: ['', [Validators.required]],
    createdBy: [{value: '', disabled: true}]
  });

  constructor(private httpService : HttpService, private route: ActivatedRoute, private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.httpService.getCandidate(this.id).then(result => {
        this.candidate = result as Candidate;
        console.log(this.candidate);

        this.candidateForm.get('id')?.setValue(String(this.candidate.id));
        this.candidateForm.get('createdDateTime')?.setValue(String(this.candidate.createdDateTime));
        this.candidateForm.get('firstName')?.setValue(String(this.candidate.firstName));
        this.candidateForm.get('lastName')?.setValue(String(this.candidate.lastName));
        this.candidateForm.get('ssn')?.setValue(String(this.candidate.ssn));
        this.candidateForm.get('dob')?.setValue(String(this.candidate.dob));
        this.candidateForm.get('email')?.setValue(String(this.candidate.email));
        this.candidateForm.get('source1')?.setValue(String(this.candidate.source1));
        this.candidateForm.get('source2')?.setValue(String(this.candidate.source2));
        this.candidateForm.get('desiredJobTitle')?.setValue(String(this.candidate.desiredJobTitle));
        this.candidateForm.get('backgroundCheckAuthorizationTimestampET')?.setValue(String(this.candidate.backgroundCheckAuthorizationTimestampET));
        this.candidateForm.get('backgroundCheckLevel')?.setValue(String(this.candidate.backGroundCheckLevel));
        this.candidateForm.get('driversLicenseState')?.setValue(String(this.candidate.driversLicenseState));
        this.candidateForm.get('driversLicenseNumber')?.setValue(String(this.candidate.driversLicenseNumber));
        this.candidateForm.get('status')?.setValue(String(this.candidate.status));
        this.candidateForm.get('createdBy')?.setValue(String(this.candidate.createdBy));
      }).catch(error => console.error(error));
    });

  }
  onSubmit() {

  }
}
