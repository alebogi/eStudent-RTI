import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeVestiComponent } from './dodavanje-vesti.component';

describe('DodavanjeVestiComponent', () => {
  let component: DodavanjeVestiComponent;
  let fixture: ComponentFixture<DodavanjeVestiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodavanjeVestiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodavanjeVestiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
