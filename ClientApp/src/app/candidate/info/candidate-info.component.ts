import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SubmitMode} from 'src/enums/submit-mode.enum';
import {Candidate} from 'src/models/candidate.model';
import {HttpService} from 'src/services/http.service';
import {DateTime} from "luxon";
import {CandidateStatus} from "../../../enums/candidate-status.enum";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.css']
})
export class CandidateInfoComponent implements OnInit {
  @Input() hideCreateInfo: boolean = true;
  @Input() submitMode: SubmitMode = SubmitMode.Create;
  private candidate = {} as Candidate;
  candidateDob : Date = new Date();
  candidateBgTimeStamp : Date = new Date();
  candidateCreatedDT : Date = new Date();
  attemptedSubmit: boolean = false;

  statuses: any[] = [
    CandidateStatus.InProgress,
    CandidateStatus.Hired,
    CandidateStatus.Rejected
  ];

  candidateForm = this.fb.group({
    id: [{value: null as number|null, disabled: true}],
    createdDateTime: [{value: '', disabled: true}],
    createdBy: [{value: '', disabled: true}],
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
    status: [CandidateStatus.InProgress, [Validators.required]]
  });

  constructor(private fb: FormBuilder, private httpService : HttpService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {

  }

  updateForm(candidate: Candidate, forcePatch: boolean) {
    this.candidate = candidate;
    if(forcePatch) {
      this.candidateForm.patchValue(candidate);
      this.candidateDob = DateTime.fromISO(this.candidate.dob).toJSDate();
      this.candidateCreatedDT = DateTime.fromISO(this.candidate.createdDateTime).toJSDate();
      this.candidateBgTimeStamp = DateTime.fromISO(this.candidate.backgroundCheckAuthorizationTimestampET).toJSDate();
    }
  }

  validateForm() {
    for (const field in this.candidateForm.controls) {

      const control = this.candidateForm.get(field);
      console.log("name: ", field, "value: ", control?.valid);

    }
  }

  onSubmit() {
    this.attemptedSubmit = true;
    this.candidateForm.controls.dob.setValue(this.candidateDob.toISOString());
    this.candidateForm.controls.backgroundCheckAuthorizationTimestampET.setValue(this.candidateBgTimeStamp.toISOString());
    this.candidateForm.controls.createdDateTime.setValue(this.candidateCreatedDT.toISOString());
    this.validateForm();
    console.log(this.candidateForm.valid);
    if(this.candidateForm.valid){
      if(this.submitMode === SubmitMode.Create) {
        this.httpService.postCandidate(this.candidateForm.value as Candidate).subscribe(result => this.router.navigate(['/candidate']));
      } else if (this.submitMode === SubmitMode.Update) {
        let result = this.candidateForm.value;
        result.id = this.candidate.id;
        result.createdDateTime = this.candidate.createdDateTime;
        result.createdBy = this.candidate.createdBy;

        this.httpService.putCandidate(result as Candidate).subscribe(result => {
          console.log(result)
          this.messageService.add({severity:'success', summary:'Success!', detail:'Candidate Updated Successfully.'});
        }, error => {
          this.messageService.add({severity:'error', summary:'Error!', detail:'Candidate Update Errored.'});
        });
      }
    }
  }
}
