import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsekSIComponent } from './odsek-si.component';

describe('OdsekSIComponent', () => {
  let component: OdsekSIComponent;
  let fixture: ComponentFixture<OdsekSIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsekSIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsekSIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
