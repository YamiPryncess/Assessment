import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Candidate} from "../../data/candidate.model";
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {
  cars: Car[] = [];
  products: Product[] = [];
  cols: any[] = [];
  candidates: any;
  router: Router;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, _router: Router) {
    this.router = _router;
    http.get<any>(baseUrl + 'api/candidates', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(result => {
      this.candidates = result;
    }, error => console.error(error));
  }

  ngOnInit() {
    
    this.cols = [{ field: 'firstName' }, { field: 'First Name' },
      { field: 'lastName' }, { field: 'Last Name' },
      { field: 'snn' }, { field: 'SSN' },
      { field: 'source' }, { field: 'Source' },
    ]
  }

  onRowView(candidate: any) {
    this.router.navigate(['/candidate', candidate.id ]);
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
