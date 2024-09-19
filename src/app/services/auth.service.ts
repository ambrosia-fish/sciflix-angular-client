import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private router: Router,
    private fetchApiData: FetchApiDataService
  ) {
    this.checkLoginStatus();
  }

  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.fetchApiData.userLogin({ username, password }).subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
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

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/welcome']);
  }

  checkLoginStatus(): void {
    const user = localStorage.getItem('user');
    this.isLoggedInSubject.next(!!user);
  }
}