import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoadComponent } from './road/road.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './service/http-error.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { TripeComponent } from './tripe/tripe.component';
import { CommandComponent } from './command/command.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { GaugeComponent } from './gauge/gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    RoadComponent,
    NavbarComponent,
    TripeComponent,
    CommandComponent,
    GaugeComponent
  ],
  imports: [
    NgbModule,
    NgbAlertModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

