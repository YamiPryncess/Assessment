import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { take } from 'rxjs';
import { Session } from 'src/models/session.model';
import { HttpService } from 'src/services/http.service';
import {Answer} from "../../../models/answer.model";

@Component({
  selector: 'app-session-review',
  templateUrl: './session-review.component.html',
  styleUrls: ['./session-review.component.css']
})
export class SessionReviewComponent implements OnInit {
  id!: number;
  session = {} as Session;
  answers = [] as Answer[];
  testName: string = "";

  constructor(private httpService: HttpService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.httpService.getSession(this.id).pipe(take(1)).subscribe(
        result => {
          this.session = result;
          this.answers = this.session.answers;
          this.testName = this.session?.test?.name ? this.session?.test?.name : "Test";
        });
    });
  }

}
