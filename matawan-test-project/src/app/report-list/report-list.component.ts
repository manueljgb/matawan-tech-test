import { Component } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { ReportInterface } from '../report-card/report.interface';
import { ReportCardComponent } from '../report-card/report-card.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [
    ReportCardComponent,
    MatExpansionModule
  ],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss'
})
export class ReportListComponent {

  reports?: ReportInterface[];

  constructor(private reportsService: ReportsService) {
    this.reportsService.getReports().subscribe((response) => {
      this.reports = response;
      console.log(this.reports);
    });
  }

}
