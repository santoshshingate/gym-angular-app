import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecieptComponent } from './add-reciept.component';

describe('AddRecieptComponent', () => {
  let component: AddRecieptComponent;
  let fixture: ComponentFixture<AddRecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecieptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
