/**
 * Authentication Service for the Sci-Flix Angular application.
 * Handles user authentication, login status, and related operations.
 * @module AuthService
 */

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  /** Observable for the login status */
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private isBrowser: boolean;

  /**
   * @param router - Angular Router for navigation
   * @param fetchApiData - Service for API calls
   * @param platformId - Injection token for determining the current platform
   */
  constructor(
    private router: Router,
    private fetchApiData: FetchApiDataService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.checkLoginStatus();
  }

  /**
   * Logs in a user with the provided credentials.
   * @param username - The user's username
   * @param password - The user's password
   * @returns An Observable of the login response
   */
  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.fetchApiData.userLogin({ username, password }).subscribe({
        next: (response) => {
          if (this.isBrowser) {
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
          }
          this.isLoggedInSubject.next(true);
          this.router.navigate(['/movies']);
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/welcome']);
  }

  /**
   * Checks and updates the current login status.
   */
  checkLoginStatus(): void {
    if (this.isBrowser) {
      const user = localStorage.getItem('user');
      this.isLoggedInSubject.next(!!user);
    } else {
      this.isLoggedInSubject.next(false);
    }
  }
}