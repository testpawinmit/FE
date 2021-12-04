import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingReportComponent } from './feeding-report.component';

describe('FeedingReportComponent', () => {
  let component: FeedingReportComponent;
  let fixture: ComponentFixture<FeedingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
