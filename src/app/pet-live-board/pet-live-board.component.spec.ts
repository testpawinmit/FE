import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetLiveBoardComponent } from './pet-live-board.component';

describe('PetLiveBoardComponent', () => {
  let component: PetLiveBoardComponent;
  let fixture: ComponentFixture<PetLiveBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetLiveBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetLiveBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
