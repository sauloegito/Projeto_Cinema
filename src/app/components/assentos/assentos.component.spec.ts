import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssentosComponent } from './assentos.component';

describe('AssentosComponent', () => {
  let component: AssentosComponent;
  let fixture: ComponentFixture<AssentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssentosComponent]
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
