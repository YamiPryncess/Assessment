import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { take } from 'rxjs';
import {Test} from "../../../models/test.model";
import {Session} from "../../../models/session.model";

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
  sessions = [] as Session[];
  sessionsTable = {};

  constructor(private httpService : HttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.getSessions().pipe(take(1)).subscribe(result => {
      this.sessions = result as Session[];
      console.log(this.sessions)
    });
  }

  onRowView(test: Test) {
    this.router.navigate(['/session/review', test.id]);
  }

  assignModal() {

  }
}

