import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripeComponent } from './tripe.component';

describe('TripeComponent', () => {
  let component: TripeComponent;
  let fixture: ComponentFixture<TripeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
