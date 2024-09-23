/**
 * Test suite for the DirectorDialogComponent.
 * @module DirectorDialogComponentSpec
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectorDialogComponent } from './director-dialog.component';

describe('DirectorDialogComponent', () => {
  let component: DirectorDialogComponent;
  let fixture: ComponentFixture<DirectorDialogComponent>;

  /**
   * Asynchronous setup for each test case.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorDialogComponent);
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