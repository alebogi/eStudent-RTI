import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsekOstaloComponent } from './odsek-ostalo.component';

describe('OdsekOstaloComponent', () => {
  let component: OdsekOstaloComponent;
  let fixture: ComponentFixture<OdsekOstaloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsekOstaloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsekOstaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
