import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPetProfileComponent } from './customer-pet-profile.component';

describe('CustomerPetProfileComponent', () => {
  let component: CustomerPetProfileComponent;
  let fixture: ComponentFixture<CustomerPetProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPetProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
