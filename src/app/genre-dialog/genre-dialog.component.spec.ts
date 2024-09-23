/**
 * Test suite for the GenreDialogComponent.
 * @module GenreDialogComponentSpec
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenreDialogComponent } from './genre-dialog.component';

describe('GenreDialogComponent', () => {
  let component: GenreDialogComponent;
  let fixture: ComponentFixture<GenreDialogComponent>;

  /**
   * Asynchronous setup for each test case.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreDialogComponent);
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