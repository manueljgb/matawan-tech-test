import { AfterContentInit, Component, HostListener, Input } from '@angular/core';
import { ReportInterface } from './report.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { ObservationsService } from '../services/observations.service';
import { ObservationInterface } from './observation.interface';
import { ReportFullViewComponent } from '../report-full-view/report-full-view.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';




@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],

  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],

  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss'
})
export class ReportCardComponent implements AfterContentInit {

  isMobile = window.innerWidth < 1188;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 1188;
  }

  @Input() report!: ReportInterface;

  age?: number;

  currentObservations: number[] = [];
  allObservations: ObservationInterface[] = [];



  constructor(private obsService: ObservationsService,
    public dialog: MatDialog,
  ) { }

  ngAfterContentInit(): void {
    this.obsService.getObservations().subscribe((response) => this.allObservations = response);
    this.age = this.currentAgeFrom(this.report.author.birth_date);
    if (!!this.report.observations) {
      this.currentObservations = this.report.observations;
      console.log("this.currentObservations", this.currentObservations)
    }

  }

  /**
   * Calculate the person current age
   * @param birthDate Date of birth in format "YYYY-MM-DD"
   */
  currentAgeFrom(birthDate: string): number {
    const [year, month, day] = birthDate.split("-").map(Number);
    const currentDate = new Date();
    const bdayHappened = currentDate.getMonth() > month || (currentDate.getMonth() === month && currentDate.getDate() >= day);

    return currentDate.getFullYear() - year - (bdayHappened ? 0 : 1);
  }

  /**
   * Check if the given birth-date has the correct format
   * @param birthDate Date of birth (should be in format "YYYY-MM-DD")
   */
  checkBirthDate(birthDate: string): boolean {
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    return !regexDate.test(birthDate);
  }

  getObservationNameById(id: number): string {
    let obName = '';
    this.obsService.getObservationById(id).pipe(map((response) => response.name)).subscribe((name) => obName = name).unsubscribe();
    return obName
  }

  /**
   * Check if the given obeservation belongs to the current observations list
   * @param obsID Observation 
   */
  belongsToCurrentObservations(obs: ObservationInterface): boolean {
    if (!!obs) {
      return this.currentObservations.some((curr) => curr === obs.id);
    } else {
      return false;
    }
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ReportFullViewComponent, {
      data: { report: this.report, observations: this.allObservations },
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
