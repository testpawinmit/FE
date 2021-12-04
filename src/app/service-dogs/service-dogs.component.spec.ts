import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDogsComponent } from './service-dogs.component';

describe('ServiceDogsComponent', () => {
  let component: ServiceDogsComponent;
  let fixture: ComponentFixture<ServiceDogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
