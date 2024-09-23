/**
 * Test suite for the AuthService.
 * @module AuthServiceSpec
 */

import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  /**
   * Setup for each test case.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  /**
   * Test case to verify if the service is created successfully.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});