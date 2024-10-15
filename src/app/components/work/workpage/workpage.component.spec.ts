import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpageComponent } from './workpage.component';

describe('WorkpageComponent', () => {
  let component: WorkpageComponent;
  let fixture: ComponentFixture<WorkpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
