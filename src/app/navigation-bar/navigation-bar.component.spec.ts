/**
 * Test suite for the NavigationBarComponent.
 * @module NavigationBarComponentSpec
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarComponent } from './navigation-bar.component';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  /**
   * Asynchronous setup for each test case.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
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