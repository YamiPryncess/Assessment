import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Candidate} from "../../data/candidate.model";
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {
  cars: Car[] = [];
  products: Product[] = [];
  cols: any[] = [];
  oldCandidates: any = [{name:"Lynn", score1: "100", score2: "101.5", vin: "sdf", year: "dsf", brand: "dsfs", color: "sdf"},{name:"Chloe", score1: "112", score2: "95", vin: "", year: "", brand: "", color: ""}];
  // cols: any = [{header: "erfwrf", field: "sdfdsfs"},{header: "erfwrf", field: "sdfdsfs"},{header: "erfwrf", field: "sdfdsfs"}]
  candidates: any;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/candidates', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(result => {
      this.candidates = result;
      console.log(result);
    }, error => console.error(error));
  }

  ngOnInit() {
    
    this.cols = [{ field: 'firstName' }, { field: 'First Name' },
      { field: 'lastName' }, { field: 'Last Name' },
      { field: 'snn' }, { field: 'SSN' },
      { field: 'source' }, { field: 'Source' },
    ]

    /*this.cars.push({vin: 'edfredsf', year: 'yegfsdgf', brand: 'dsfdsf', color: 'sdfdsf'});
    this.cars.push({vin: 'fdgdfg', year: 'rgterg', brand: 'gfhjfg', color: 'dsfdsfsf'});
    this.cars.push({vin: 'edfredsf', year: 'yegfsdgf', brand: 'dsfdsf', color: 'sdfdsf'});
    this.products.push({code: "dsfdsf", name: "dsfsdf", category: "sdfdsf", quantity: "dsfdsf"});
    this.products.push({code: "dsfdsf", name: "dsfsdf", category: "sdfdsf", quantity: "dsfdsf"});
    this.products.push({code: "dsfdsf", name: "dsfsdf", category: "sdfdsf", quantity: "dsfdsf"});*/
    /*this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];*/
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
