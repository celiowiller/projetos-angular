import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirForComponent } from './dir-for.component';

describe('DirForComponent', () => {
  let component: DirForComponent;
  let fixture: ComponentFixture<DirForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirForComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
