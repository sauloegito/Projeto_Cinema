import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarFilmeComponent } from './adicionar-filme.component';

describe('AdicionarFilmeComponent', () => {
  let component: AdicionarFilmeComponent;
  let fixture: ComponentFixture<AdicionarFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarFilmeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
