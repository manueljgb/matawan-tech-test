import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, switchMap, throwError } from 'rxjs';
import { ReportInterface } from '../report-card/report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl = 'http://localhost:3000/reports';
  constructor(private http: HttpClient) { }

  getReports(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  createReport(reportData: ReportInterface): Observable<any> {
    return this.emailAlreadyExist(reportData.author.email).pipe(
      switchMap((exists) => {
        if (exists) {
          alert('This email value already exist.');
          return throwError({ status: 400, message: 'This value already exist.' });
        } else {
          return this.http.post<any>(`${this.apiUrl}`, reportData);
        }
      })
    );
  }

  updateReport(reportData: ReportInterface): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reportData.id}`, reportData);
  }

  emailAlreadyExist(email: string): Observable<boolean> {
    return this.getReports().pipe(
      map((reports: ReportInterface[]) => reports.some((report) => report.author.email === email))
    );
  }
}
