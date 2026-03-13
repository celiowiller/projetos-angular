import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirIfComponent } from './dir-if.component';

describe('DirIfComponent', () => {
  let component: DirIfComponent;
  let fixture: ComponentFixture<DirIfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirIfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirIfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
