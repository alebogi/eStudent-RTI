import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaZaposlenogComponent } from './izmena-zaposlenog.component';

describe('IzmenaZaposlenogComponent', () => {
  let component: IzmenaZaposlenogComponent;
  let fixture: ComponentFixture<IzmenaZaposlenogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaZaposlenogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaZaposlenogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
