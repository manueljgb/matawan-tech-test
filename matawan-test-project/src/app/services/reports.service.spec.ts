import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReportsService } from './reports.service';
import { ReportInterface } from '../report-card/report.interface';
import { of } from 'rxjs';

fdescribe('ReportsService', () => {
  let service: ReportsService;
  let httpTestingController: HttpTestingController;
  let mockReport: ReportInterface;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportsService]
    });
    service = TestBed.inject(ReportsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    mockReport = {
      id: 1,
      author: {
        first_name: "John",
        last_name: "Doe",
        email: "j.doe@mobireport.com",
        birth_date: "1990-01-01",
        sex: "Homme"
      },
      observations: [1, 2],
      description: "Un soucis sur mon réseau"
    };
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get reports', () => {
    service.getReports().subscribe();
    const req = httpTestingController.expectOne('http://localhost:3000/reports');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should create a report', () => {
    spyOn(service, 'emailAlreadyExist').and.returnValue(of(false));
    service.createReport(mockReport).subscribe();
    const req = httpTestingController.expectOne('http://localhost:3000/reports');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should update a report', () => {
    service.updateReport(mockReport).subscribe();
    const req = httpTestingController.expectOne(`http://localhost:3000/reports/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should check if email already exists', () => {
    service.emailAlreadyExist('test@example.com').subscribe();
    const req = httpTestingController.expectOne('http://localhost:3000/reports');
    expect(req.request.method).toBe('GET');
    req.flush([{ author: { email: 'test@example.com' } }]);
  });
});