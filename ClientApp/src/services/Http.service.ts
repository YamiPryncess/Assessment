import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { Candidate } from "src/models/candidate.model";
import { Question } from "src/models/question.model";
import { Session } from "src/models/session.model";
import { Test } from "src/models/test.model";
import { TestSession } from "src/models/test-session.model";

@Injectable({
    providedIn: 'root',
   })
export class HttpService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,) {}

  //Get
  getCandidates() {
    return this.http.get<Candidate[]>(this.baseUrl + 'api/candidates', {
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

  getSessions() {
    return this.http.get<Session[]>(this.baseUrl + 'api/sessions', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  getQuestions() {
    return this.http.get<Question[]>(this.baseUrl + 'api/questions', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  //Get by ID

  getCandidate(id: number) {
    return this.http.get<Candidate>(this.baseUrl + 'api/candidates/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  getTest(id: number) {
    return this.http.get<Test>(this.baseUrl + 'api/tests/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      });
  }

  getSession(id: number) {
    return this.http.get<Session>(this.baseUrl + 'api/sessions/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  getQuestion(id: number) {
    return this.http.get<Question>(this.baseUrl + 'api/questions/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  //Post

  postCandidate(candidate: Candidate) {
    return this.http.post<Candidate>(this.baseUrl + 'api/candidates', candidate, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  postTest(test: Test) {
    return this.http.post<Test>(this.baseUrl + 'api/tests', test, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  postSession(session: Session) {
    return this.http.post<Session>(this.baseUrl + 'api/sessions', session, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  postQuestion(question: Question) {
    return this.http.post<Question>(this.baseUrl + 'api/questions', question, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  //Put

  putCandidate(candidate: Candidate) {
    return this.http.put<Candidate>(this.baseUrl + 'api/candidates/' + candidate.id, candidate, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  putTest(test: Test) {
    return this.http.put<Test>(this.baseUrl + 'api/tests/' + test.id, test, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  putSession(session: Session) {
    return this.http.put<Session>(this.baseUrl + 'api/sessions/' + session.id, session, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  putQuestion(question: Question) {
    return this.http.put<Question>(this.baseUrl + 'api/questions/' + question.id, question, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  //Delete

  deleteCandidate(id: number) {
    return this.http.delete<Candidate>(this.baseUrl + 'api/candidates/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  deleteTest(id: number) {
    return this.http.delete<Test>(this.baseUrl + 'api/tests/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  deleteSession(id: number) {
    return this.http.delete<Session>(this.baseUrl + 'api/sessions/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  deleteQuestion(id: number) {
    return this.http.delete<Question>(this.baseUrl + 'api/questions/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    });
  }

  //Special

  getSessionByGuid(guid: string) {
    return this.http.get<Session>(this.baseUrl + 'api/sessions/guid/' + guid, {
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