import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts'; 

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
