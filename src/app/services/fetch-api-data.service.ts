/**
 * Service for handling API requests in the Sci-Flix Angular application.
 * @module FetchApiDataService
 */

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

  /**
   * Gets the authentication headers for API requests.
   * @returns HttpHeaders with the Authorization token
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
  }

  /**
   * Fetches all movies from the API.
   * @returns Observable of all movies
   */
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches a single movie by title.
   * @param title - The title of the movie
   * @returns Observable of the requested movie
   */
  getOneMovie(title: string): Observable<any> {
    return this.http.get(apiUrl + `movies/${title}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches genre information.
   * @param genreName - The name of the genre
   * @returns Observable of the genre information
   */
  getGenre(genreName: string): Observable<any> {
    return this.http.get(apiUrl + `movies/genre/${genreName}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches director information.
   * @param directorName - The name of the director
   * @returns Observable of the director information
   */
  getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + `movies/director/${directorName}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches all users.
   * @returns Observable of all users
   */
  getAllUsers(): Observable<any> {
    return this.http.get(apiUrl + 'users').pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches a single user by username.
   * @param username - The username of the user
   * @returns Observable of the requested user
   */
  getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Registers a new user.
   * @param userDetails - The details of the user to register
   * @returns Observable of the registration response
   */
  userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user.
   * @param userDetails - The login credentials of the user
   * @returns Observable of the login response
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Updates user information.
   * @param username - The username of the user to update
   * @param userDetails - The new details for the user
   * @returns Observable of the update response
   */
  updateUser(username: string, userDetails: any): Observable<any> {
    return this.http.patch(apiUrl + `users/${username}`, userDetails, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches a user's favorite movies.
   * @param username - The username of the user
   * @returns Observable of the user's favorite movies
   */
  getUserFavorites(username: string): Observable<any> {
    return this.getUser(username);
  }

  /**
   * Adds or removes a movie from a user's favorites.
   * @param username - The username of the user
   * @param movieId - The ID of the movie to add or remove
   * @returns Observable of the update response
   */
  addRemoveFavoriteMovie(username: string, movieId: string): Observable<any> {
    const url = `${apiUrl}users/${username}/favorites`;
    return this.http.post(url, { newFavorite: movieId }, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user account.
   * @param username - The username of the user to delete
   * @returns Observable of the deletion response
   */
  deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Extracts the response data from an HTTP response.
   * @param res - The HTTP response
   * @returns The extracted response data
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  /**
   * Handles HTTP errors.
   * @param error - The HTTP error response
   * @returns An Observable with an error message
   */
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