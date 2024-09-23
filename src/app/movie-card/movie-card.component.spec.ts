/**
 * Test suite for the MovieCardComponent.
 * @module MovieCardComponentSpec
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  /**
   * Asynchronous setup for each test case.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
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