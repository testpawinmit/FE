import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfServiceDogsComponent } from './list-of-service-dogs.component';

describe('ListOfServiceDogsComponent', () => {
  let component: ListOfServiceDogsComponent;
  let fixture: ComponentFixture<ListOfServiceDogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfServiceDogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfServiceDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
