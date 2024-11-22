import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarFilmesComponent } from './gerenciar.component';

describe('GerenciarComponent', () => {
  let component: GerenciarFilmesComponent;
  let fixture: ComponentFixture<GerenciarFilmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GerenciarFilmesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarFilmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
