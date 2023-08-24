import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { take } from 'rxjs';
import { Test } from 'src/models/test.model';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  id!: number;
  test = {} as Test;

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.httpService.getTest(this.id).pipe(take(1)).subscribe(
        result => {
          this.test = result as Test;
        });
    });
  }

}
