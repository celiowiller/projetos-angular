import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EBindingComponent } from './e-binding.component';

describe('EBindingComponent', () => {
  let component: EBindingComponent;
  let fixture: ComponentFixture<EBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EBindingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
