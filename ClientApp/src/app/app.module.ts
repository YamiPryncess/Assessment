import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

import {MessageService} from "primeng/api";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CandidateListComponent } from './candidate/list/candidate-list.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { CandidateComponent } from './candidate/main/candidate.component';
import { CandidateInfoComponent } from './candidate/info/candidate-info.component';
import { SessionComponent } from './session/main/session.component';
import { SessionListComponent } from './session/list/session-list.component';
import { TestListComponent } from './test/list/test-list.component';
import { TestComponent } from './test/main/test.component';
import { HomeComponent } from './home/home.component';
import { SessionReviewComponent } from './session/review/session-review.component';
import { TestCreateComponent } from './test/create/test-create.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CandidateListComponent,
    CandidateComponent,
    CandidateInfoComponent,
    SessionComponent,
    SessionListComponent,
    TestListComponent,
    TestComponent,
    HomeComponent,
    SessionReviewComponent,
    TestCreateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    TabViewModule,
    DialogModule,
    AutoCompleteModule,
    ApiAuthorizationModule,
    BrowserAnimationsModule,
    InputTextModule,
    CalendarModule,
    RadioButtonModule,
    ToastModule,
    DropdownModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },

      { path: 'candidate/add', component: CandidateInfoComponent}, //Add candidates
      { path: 'candidate/:id', component: CandidateComponent}, //Admin Facing Main Component.
      { path: 'candidate', component: CandidateListComponent}, //Lists all candidates

      { path: 'test/add', component: TestCreateComponent}, //Add tests
      { path: 'test/:id', component: TestComponent}, //Admin Facing Main Component
      { path: 'test', component: TestListComponent}, //Lists all tests

      { path: 'session/review/:id', component: SessionReviewComponent}, //Admin Facing Candidate Review.
      { path: 'session/:guid', component: SessionComponent}, //Candidate Facing Main Component.
      { path: 'session', component: SessionListComponent}, //Lists all sessions

      { path: '**', component: CandidateListComponent}
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
