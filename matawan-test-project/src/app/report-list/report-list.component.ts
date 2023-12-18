import { Component } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { ReportInterface } from '../report-card/report.interface';
import { ReportCardComponent } from '../report-card/report-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ReportFullViewComponent } from '../report-full-view/report-full-view.component';
import { MatDialog } from '@angular/material/dialog';
import { ObservationInterface } from '../report-card/observation.interface';
import { ObservationsService } from '../services/observations.service';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [
    ReportCardComponent,
    MatExpansionModule,
    MatButtonModule
  ],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss'
})
export class ReportListComponent {

  reports?: ReportInterface[];
  allObservations: ObservationInterface[] = [];


  constructor(
    private reportsService: ReportsService,
    private obsService: ObservationsService,
    public dialog: MatDialog,
  ) {
    this.reportsService.getReports().subscribe((response) => {
      this.reports = response;
      console.log(this.reports);
    });
    this.obsService.getObservations().subscribe((response) => this.allObservations = response);

  }

  openCreateNewDialog(): void {
    const dialogRef = this.dialog.open(ReportFullViewComponent, {
      data: { observations: this.allObservations },
      height: '80%',
      width: '40%',
      minWidth: '300px'
    }).afterClosed().subscribe((result) => {
      if (!!result && result.action === 'reload') {
        window.location.reload();
      }
    });
  }

}
