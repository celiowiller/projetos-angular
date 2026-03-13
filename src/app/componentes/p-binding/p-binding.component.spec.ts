import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PBindingComponent } from './p-binding.component';

describe('PBindingComponent', () => {
  let component: PBindingComponent;
  let fixture: ComponentFixture<PBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PBindingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
