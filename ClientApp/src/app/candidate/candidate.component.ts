import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { take } from 'rxjs';
import { Candidate } from 'src/models/candidate.model';
import { Test } from 'src/models/test.model';
import { Session } from 'src/models/session.model';
import { HttpService } from 'src/services/http.service';
import { TestSession } from 'src/models/test-session.model';
import { CandidateInfoComponent } from '../candidate-info/candidate-info.component';
import { SubmitMode } from 'src/enums/submit-mode.enum';
import { SessionStatus } from 'src/enums/session-status.enum';

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
  submitMode: SubmitMode = SubmitMode.Update;
  @ViewChild('info') infoComponent!: CandidateInfoComponent;

  constructor(private httpService : HttpService, private route: ActivatedRoute) {}
  
  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.refreshCandidate();
    });

    this.httpService.getTests().subscribe(results => {
      this.tests = results as Test[];
      //console.log(this.tests);
    })
  }

  refreshCandidate() {
    this.httpService.getCandidate(this.id).pipe(take(1)).subscribe(
      result => {
      this.candidate = result as Candidate;
      this.sessions = result.sessions as Session[];
      //console.log(this.candidate);
      this.infoComponent.updateForm(this.candidate);
    });
    this.httpService.getAssignedSessions(this.id).subscribe(results => {
      this.assignedSessions = results as TestSession[];
      console.log(this.assignedSessions);
    });
  }
  
  assignTest(toAssign: TestSession) {
    var session = {} as Session;
    
    session.candidateId = this.id;
    session.testId = toAssign.testId;
    session.status = SessionStatus.Assigned;

    this.httpService.postSession(session).subscribe(results => {
      this.refreshCandidate();
    });
  }

  removeTest(toRemove: TestSession) {
    this.httpService.deleteSession(toRemove.id).subscribe(results => {
      this.refreshCandidate();
    });
  }
}
