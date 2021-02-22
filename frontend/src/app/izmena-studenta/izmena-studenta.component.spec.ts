import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaStudentaComponent } from './izmena-studenta.component';

describe('IzmenaStudentaComponent', () => {
  let component: IzmenaStudentaComponent;
  let fixture: ComponentFixture<IzmenaStudentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaStudentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaStudentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
