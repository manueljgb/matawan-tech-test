import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getReportById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
  }

  createReport(reportData: ReportInterface): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, reportData);
  }

  updateReport(id: number, reportData: ReportInterface): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reports/${id}`, reportData);
  }
}
