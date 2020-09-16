import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetcustomerpasswordComponent } from './resetcustomerpassword.component';

describe('ResetcustomerpasswordComponent', () => {
  let component: ResetcustomerpasswordComponent;
  let fixture: ComponentFixture<ResetcustomerpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetcustomerpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetcustomerpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
