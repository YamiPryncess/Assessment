import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { filter, map, take } from 'rxjs';
import { Candidate } from 'src/data/candidate.model';
import { Test } from 'src/data/test.model';
import { Session, TestStatus } from 'src/data/session.model';
import { HttpService } from 'src/services/Http.service';
import { TestSession } from 'src/data/test-session.model';
import { CandidateInfoComponent } from '../candidate-info/candidate-info.component';
import { FormGroup } from '@angular/forms';
import { SubmitMode } from 'src/data/submit-mode.enum';

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
    session.status = TestStatus.Assigned;

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
