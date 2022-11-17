import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { Candidate } from "src/data/candidate.model";
import { Test } from "src/data/test.model";
import { TestSession } from "src/data/testsession.model";

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
      });
  }

  getCandidate(id: number) {
    return this.http.get<Candidate>(this.baseUrl + 'api/candidates/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      });
  }

  getTests() {
    return this.http.get<Test[]>(this.baseUrl + 'api/tests', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }
  getAssignedSessions(id: number) {
    return this.http.get<TestSession[]>(this.baseUrl + 'api/sessions/candidates/' + id + "/Assigned", {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }
}