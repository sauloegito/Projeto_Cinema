import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssentosComponent } from './assentos.component';
import { AppRoutingModule } from '../../app-routing.module';

describe('AssentosComponent', () => {
  let component: AssentosComponent;
  let fixture: ComponentFixture<AssentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssentosComponent],
      imports: [AppRoutingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
