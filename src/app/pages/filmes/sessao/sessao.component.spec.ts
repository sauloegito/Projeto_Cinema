import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoComponent } from './sessao.component';
import { AppRoutingModule } from '../../app-routing.module';

describe('SessaoComponent', () => {
  let component: SessaoComponent;
  let fixture: ComponentFixture<SessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessaoComponent],
      imports: [AppRoutingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
