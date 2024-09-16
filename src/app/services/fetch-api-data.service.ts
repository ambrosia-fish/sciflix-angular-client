import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const apiUrl = 'https://sci-flix-075b51101639.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
  }

  // Get all movies
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    );
  }

  // Get one movie
  getOneMovie(title: string): Observable<any> {
    return this.http.get(apiUrl + `movies/${title}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Get genre
  getGenre(genreName: string): Observable<any> {
    return this.http.get(apiUrl + `movies/genre/${genreName}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Get director
  getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + `movies/director/${directorName}`, { headers: this.getAuthHeaders() }).pipe(
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
    return this.http.get(apiUrl + `users/${username}`, { headers: this.getAuthHeaders() }).pipe(
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
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Update user
  updateUser(username: string, userDetails: any): Observable<any> {
    return this.http.patch(apiUrl + `users/${username}`, userDetails, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Get user favorite movies
  getUserFavorites(username: string): Observable<any> {
    return this.getUser(username);
  }

  // Add/remove favorite movie
  addRemoveFavoriteMovie(username: string, movieId: string): Observable<any> {
    const url = `${apiUrl}users/${username}/favorites`;
    return this.http.post(url, { newFavorite: movieId }, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete user
  deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}