import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaVestiComponent } from './izmena-vesti.component';

describe('IzmenaVestiComponent', () => {
  let component: IzmenaVestiComponent;
  let fixture: ComponentFixture<IzmenaVestiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaVestiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaVestiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
