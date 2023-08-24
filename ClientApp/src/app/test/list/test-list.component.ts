import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { take } from 'rxjs';
import {Test} from "../../../models/test.model";
@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests = [] as Test[];
  constructor(private httpService : HttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.getTests().pipe(take(1)).subscribe(result => {
      this.tests = result as Test[];
    });
  }
  onNewTest() {
    this.router.navigate(['/test/add']);
  }

  onRowView(test: Test) {
    this.router.navigate(['/test', test.id]);
  }
}
