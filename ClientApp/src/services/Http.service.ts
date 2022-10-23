import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { Candidate } from "src/data/candidate.model";

@Injectable({
    providedIn: 'root',
   })
export class HttpService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,) {}

  getCandidates() {
    return this.http.get<Candidate[]>(this.baseUrl + 'api/candidates', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      }).toPromise();
  }

  getCandidate(id: number) {
    return this.http.get<Candidate>(this.baseUrl + 'api/candidates/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      }).toPromise();
  }
}