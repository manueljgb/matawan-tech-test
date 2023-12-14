import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservationInterface } from '../report-card/observation.interface';

@Injectable({
  providedIn: 'root'
})
export class ObservationsService {

  private apiUrl = 'http://localhost:3000/observations';
  constructor(private http: HttpClient) { }

  getObservations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getObservationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
  }

}
