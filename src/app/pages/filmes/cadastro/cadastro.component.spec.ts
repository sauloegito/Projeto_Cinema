import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../../app-routing.module';
import { CadastroFilmeComponent } from './cadastro.component';

describe('CadastroComponent', () => {
  let component: CadastroFilmeComponent;
  let fixture: ComponentFixture<CadastroFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroFilmeComponent],
      imports: [AppRoutingModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
