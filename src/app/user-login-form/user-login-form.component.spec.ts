/**
 * Test suite for the UserLoginFormComponent.
 * @module UserLoginFormComponentSpec
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserLoginFormComponent } from './user-login-form.component';

describe('UserLoginFormComponent', () => {
  let component: UserLoginFormComponent;
  let fixture: ComponentFixture<UserLoginFormComponent>;

  /**
   * Asynchronous setup for each test case.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test case to verify if the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});