import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { ReportInterface } from '../report-card/report.interface';



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
    private formBuilder: FormBuilder
  ) {
    this.report = data.report;
    console.log("report", this.report)
    this.observations = data.observations

  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    
    console.log("name",this.report.author.first_name)

    this.reportFG.controls['firstNameFC'].setValue(this.report.author.first_name);
    this.reportFG.controls['lastNameFC'].setValue(this.report.author.last_name);
    this.reportFG.controls['emailFC'].setValue(this.report.author.email);
    this.reportFG.controls['genderFC'].setValue(this.report.author.sex);
    this.reportFG.controls['birthDateFC'].setValue(this.report.author.birth_date);
    this.reportFG.controls['descriptionFC'].setValue(this.report.description);
    if(!!this.report.observations) {
      this.reportFG.controls['observationsFC'].setValue(this.report.observations.map((obs) => obs.id));
    }
  }
}
