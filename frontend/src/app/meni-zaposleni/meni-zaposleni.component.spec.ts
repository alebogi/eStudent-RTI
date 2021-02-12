import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniZaposleniComponent } from './meni-zaposleni.component';

describe('MeniZaposleniComponent', () => {
  let component: MeniZaposleniComponent;
  let fixture: ComponentFixture<MeniZaposleniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniZaposleniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeniZaposleniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
