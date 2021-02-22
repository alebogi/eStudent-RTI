import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaPredmetaComponent } from './izmena-predmeta.component';

describe('IzmenaPredmetaComponent', () => {
  let component: IzmenaPredmetaComponent;
  let fixture: ComponentFixture<IzmenaPredmetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaPredmetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaPredmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
