import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietchartComponent } from './dietchart.component';

describe('DietchartComponent', () => {
  let component: DietchartComponent;
  let fixture: ComponentFixture<DietchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
