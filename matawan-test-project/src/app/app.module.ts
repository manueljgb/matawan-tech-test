import { LOCALE_ID, NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportCardComponent } from './report-card/report-card.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportFullViewComponent } from './report-full-view/report-full-view.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReportFullViewComponent,
    ReportListComponent,
    ReportCardComponent,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Es' },
  ]
})
export class AppModule { }
