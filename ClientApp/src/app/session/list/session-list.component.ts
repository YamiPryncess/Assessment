import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { take } from 'rxjs';
import {Test} from "../../../models/test.model";
import {Session} from "../../../models/session.model";
import {Candidate} from "../../../models/candidate.model";
import {SessionStatus} from "../../../enums/session-status.enum";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
  sessions = [] as Session[];
  candidates = [] as Candidate[];
  tests = [] as Test[];
  displayModal = false;
  attemptedSubmit = false;

  assignForm = this.fb.group({
    candidateId: [0 as number, [Validators.required]],
    testId: [0 as number, [Validators.required]]
  })

  constructor(private fb: FormBuilder, private httpService : HttpService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.router.onSameUrlNavigation = "reload"
    this.httpService.getSessions().pipe(take(1)).subscribe(result => {
      this.sessions = result as Session[];
    });

    this.httpService.getCandidates().pipe(take(1)).subscribe(result => {
      this.candidates = result as Candidate[];
    });

    this.httpService.getTests().pipe(take(1)).subscribe(result => {
      this.tests = result as Test[];
    });
  }

  onRowView(test: Test) {
    this.router.navigate(['/session/review', test.id]);
  }

  showAssignModal() {
    this.displayModal = true;
  }

  submitAssignModal() {
    var newSession = {} as Session;
    this.attemptedSubmit = true;
    if(this.assignForm.valid) {
      newSession.candidateId = this.assignForm.value.candidateId!;
      newSession.testId = this.assignForm.value.testId!;
      newSession.status = SessionStatus.Assigned;

      this.httpService.postSession(newSession).subscribe(results => {
        this.displayModal = false;
        this.messageService.add({severity:'success', summary:'Success!', detail:'Assignment worked!'});
        this.httpService.getSessions().pipe(take(1)).subscribe(result => {
          this.sessions = result as Session[];
        });
      }, error => {
        this.messageService.add({severity:'error', summary:'Error!', detail:'Assignment failed!'});
      });
    }
  }
}

