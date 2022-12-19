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
import {DialogModule} from 'primeng/dialog';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateInfoComponent } from './candidate-info/candidate-info.component';
import { SessionComponent } from './session/session.component';
import { SessionListComponent } from './session-list/session-list.component';
import { TestListComponent } from './test-list/test-list.component';
import { TestEditComponent } from './test-edit/test-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CandidateComponent,
    CandidateInfoComponent,
    SessionComponent,
    SessionListComponent,
    TestListComponent,
    TestEditComponent
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
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'candidate/add', component: CandidateInfoComponent},
      { path: 'candidate/:id', component: CandidateComponent},

      { path: 'session/:guid', component: SessionComponent},
      { path: 'session', component: SessionListComponent},
      
      { path: 'test/add', component: TestEditComponent},
      { path: 'test/:id', component: TestEditComponent},
      { path: 'test', component: TestListComponent},
      
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
      { path: '**', component: HomeComponent}
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
