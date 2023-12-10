import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFullViewComponent } from './report-full-view.component';

describe('ReportFullViewComponent', () => {
  let component: ReportFullViewComponent;
  let fixture: ComponentFixture<ReportFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportFullViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
