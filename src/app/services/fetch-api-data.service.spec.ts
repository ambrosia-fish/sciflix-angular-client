/**
 * Test suite for the FetchApiDataService.
 * @module FetchApiDataServiceSpec
 */

import { TestBed } from '@angular/core/testing';
import { FetchApiDataService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: FetchApiDataService;

  /**
   * Setup for each test case.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApiDataService);
  });

  /**
   * Test case to verify if the service is created successfully.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});