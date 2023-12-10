import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ReportCardComponent } from './report-card/report-card.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportFullViewComponent } from './report-full-view/report-full-view.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    ReportCardComponent,
    ReportListComponent,
    ReportFullViewComponent,
  ]
})
export class AppModule { }
