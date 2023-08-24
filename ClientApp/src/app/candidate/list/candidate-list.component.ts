import { Component } from '@angular/core';
import {Candidate} from "../../../models/candidate.model";
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
})

export class CandidateListComponent {
  candidates = [] as Candidate[];

  constructor(private httpService: HttpService, private router: Router) {
  }

  ngOnInit() {
    this.httpService.getCandidates().pipe(take(1)).subscribe(result => {
      this.candidates = result as Candidate[];
    });
  }

  onNewCandidate() {
    this.router.navigate(['/candidate/add']);
  }

  onRowView(candidate: Candidate) {
    this.router.navigate(['/candidate', candidate.id]);
  }
}
