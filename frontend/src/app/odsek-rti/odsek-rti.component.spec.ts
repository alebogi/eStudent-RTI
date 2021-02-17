import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsekRTIComponent } from './odsek-rti.component';

describe('OdsekRTIComponent', () => {
  let component: OdsekRTIComponent;
  let fixture: ComponentFixture<OdsekRTIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsekRTIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsekRTIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
