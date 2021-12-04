import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationReportComponent } from './medication-report.component';

describe('MedicationReportComponent', () => {
  let component: MedicationReportComponent;
  let fixture: ComponentFixture<MedicationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
