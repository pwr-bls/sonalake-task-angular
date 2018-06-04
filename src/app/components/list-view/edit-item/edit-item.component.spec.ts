import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveViewEditItemComponent } from './edit-item.component';

describe('LiveViewEditItemComponent', () => {
  let component: LiveViewEditItemComponent;
  let fixture: ComponentFixture<LiveViewEditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveViewEditItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveViewEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
