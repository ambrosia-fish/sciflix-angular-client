/**
 * Test suite for the SynopsisDialogComponent.
 * @module SynopsisDialogComponentSpec
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SynopsisDialogComponent } from './synopsis-dialog.component';

describe('SynopsisDialogComponent', () => {
  let component: SynopsisDialogComponent;
  let fixture: ComponentFixture<SynopsisDialogComponent>;

  /**
   * Asynchronous setup for each test case.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SynopsisDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SynopsisDialogComponent);
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