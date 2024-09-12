import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const apiUrl = 'https://sci-flix-075b51101639.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // Get all movies
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    );
  }

  // Get one movie
  getOneMovie(title: string): Observable<any> {
    return this.http.get(apiUrl + `movies/${title}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get genre
  getGenre(genreName: string): Observable<any> {
    return this.http.get(apiUrl + `movies/genre/${genreName}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get director
  getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + `movies/director/${directorName}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(apiUrl + 'users').pipe(
      catchError(this.handleError)
    );
  }

  // Get one user
  getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  // User registration
  userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  userLogin(userDetails: any): Observable<any> {
    console.log('Attempting login with:', userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Update user
  updateUser(username: string, userDetails: any): Observable<any> {
    return this.http.patch(apiUrl + `users/${username}`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Add/remove favorite movie
  addRemoveFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(apiUrl + `users/${username}/favorites`, { newFavorite: movieId }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete user
  deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}