import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictPageComponent } from './restrict-page.component';

describe('RestrictPageComponent', () => {
  let component: RestrictPageComponent;
  let fixture: ComponentFixture<RestrictPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
