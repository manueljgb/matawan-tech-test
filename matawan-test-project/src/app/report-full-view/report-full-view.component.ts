import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { ReportInterface } from '../report-card/report.interface';
import { ReportsService } from '../services/reports.service';
import { throwError } from 'rxjs';



@Component({
  selector: 'app-report-full-view',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],

  templateUrl: './report-full-view.component.html',
  styleUrl: './report-full-view.component.scss'
})
export class ReportFullViewComponent {



  report: ReportInterface;
  observations;

  minDate = new Date(new Date().getFullYear() - 100, 0, 0);
  firstNameFC = new FormControl("");
  lastNameFC = new FormControl("");
  emailFC = new FormControl("");
  genderFC = new FormControl("");
  birthDateFC = new FormControl("");
  observationsFC = new FormControl();
  descriptionFC = new FormControl("");
  reportFG = this.formBuilder.group({
    firstNameFC: this.firstNameFC,
    lastNameFC: this.lastNameFC,
    emailFC: this.emailFC,
    genderFC: this.genderFC,
    birthDateFC: this.birthDateFC,
    observationsFC: this.observationsFC,
    descriptionFC: this.descriptionFC
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReportFullViewComponent>,
    private formBuilder: FormBuilder,
    private reportsService: ReportsService,
    public dialog: MatDialog,

  ) {
    console.log(data)
    this.report = data.report ? data.report : undefined;
    this.observations = data.observations

  }

  ngAfterContentInit(): void {
    if (this.report) {
      this.reportFG.controls['firstNameFC'].setValue(this.report.author.first_name);
      this.reportFG.controls['lastNameFC'].setValue(this.report.author.last_name);
      this.reportFG.controls['emailFC'].setValue(this.report.author.email);
      this.reportFG.controls['genderFC'].setValue(this.report.author.sex);
      this.reportFG.controls['birthDateFC'].setValue(this.report.author.birth_date);
      this.reportFG.controls['descriptionFC'].setValue(this.report.description);
      this.reportFG.controls['observationsFC'].setValue(this.report.observations);
    }
    this.reportFG.controls['firstNameFC'].setValidators([Validators.required, Validators.maxLength(50)])
    this.reportFG.controls['lastNameFC'].setValidators([Validators.required, Validators.maxLength(50)])
    this.reportFG.controls['emailFC'].setValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])
    this.reportFG.controls['genderFC'].setValidators([Validators.required])
    this.reportFG.controls['birthDateFC'].setValidators([Validators.required])
  }

  updateReport(): void {
    const reportData: ReportInterface = {
      id: this.report.id,
      author: {
        first_name: this.reportFG.value.firstNameFC!,
        last_name: this.reportFG.value.lastNameFC!,
        email: this.reportFG.value.emailFC!,
        sex: this.reportFG.value.genderFC!,
        birth_date: this.reportFG.value.birthDateFC!
      },
      description: this.reportFG.value.descriptionFC!,
      observations: this.reportFG.value.observationsFC
    }
    if (this.reportFG.valid) {

      this.reportsService.updateReport(reportData).subscribe(
        () => {
          alert("The report has been modified successfully")
          this.dialogRef.close({ action: 'reload' })
        }
      )
    } else {
      alert("The form is invalid, please check it again")

    }
  }

  createReport(): void {
    const reportData: ReportInterface = {
      author: {
        first_name: this.reportFG.value.firstNameFC!,
        last_name: this.reportFG.value.lastNameFC!,
        email: this.reportFG.value.emailFC!,
        sex: this.reportFG.value.genderFC!,
        birth_date: this.reportFG.value.birthDateFC!
      },
      description: this.reportFG.value.descriptionFC ? this.reportFG.value.descriptionFC : '',
      observations: this.reportFG.value.observationsFC
    }
    if (this.reportFG.valid) {

      this.reportsService.createReport(reportData).subscribe(
        () => {
          alert("The report has been created successfully")
          this.dialogRef.close({ action: 'reload' });
        }
      )
    } else {
      alert("The form is invalid, please check it again")
    }
  }
}
