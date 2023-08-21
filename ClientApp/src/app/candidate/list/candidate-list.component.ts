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
  cars: Car[] = [];
  products: Product[] = [];
  cols: any[] = [];
  candidates = [] as Candidate[];

  constructor(private httpService : HttpService, private router: Router) {}

  ngOnInit() {
    this.httpService.getCandidates().pipe(take(1)).subscribe(result => {
      this.candidates = result as Candidate[];
    });

    this.cols = [{ field: 'firstName' }, { field: 'First Name' },
      { field: 'lastName' }, { field: 'Last Name' },
      { field: 'snn' }, { field: 'SSN' },
      { field: 'source' }, { field: 'Source' },
    ]
  }

  onNewCandidate() {
    this.router.navigate(['/candidate/add']);
  }

  onRowView(candidate: Candidate) {
    this.router.navigate(['/candidate', candidate.id]);
  }

  // loadCustomers(event: LazyLoadEvent) {
  //   this.loading = true;
  //
  //   setTimeout(() => {
  //     this.customerService.getCustomers({lazyEvent: JSON.stringify(event)}).then(res => {
  //       this.customers = res.customers;
  //       this.totalRecords = res.totalRecords;
  //       this.loading = false;
  //     })
  //   }, 1000);
  // }
}

export interface Car {
  vin: string,
  year: string,
  brand: string;
  color: string;
}

export interface Product {
  code: string,
  name: string,
  category: string,
  quantity: string
}
