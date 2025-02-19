import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

const apiUrl = 'https://sci-flix-075b51101639.herokuapp.com/';
const TMDB_API_KEY = '8e3011e350263dd4204821f433206d67';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
  }

  // Get all movies from TMDB
  getAllMovies(page: number = 1, searchQuery: string = ''): Observable<any> {
    const endpoint = searchQuery
      ? `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${page}`
      : `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=878&page=${page}&language=en-US&sort_by=popularity.desc&include_adult=false`;

    return this.getGenres().pipe(
      switchMap(genreData => 
        this.http.get(endpoint).pipe(
          switchMap((movieResponse: any) => {
            const movies = movieResponse.results.filter((movie: any) => 
              searchQuery ? true : movie.genre_ids.includes(878)
            );

            const movieDetails = movies.map((movie: any) => 
              this.getMovieCredits(movie.id).pipe(
                map(credits => {
                  const director = credits.crew.find(
                    (person: any) => person.job === 'Director'
                  );

                  const secondaryGenre = genreData.genres.find((g: any) => 
                    movie.genre_ids.includes(g.id) && g.id !== 878
                  );

                  return {
                    id: movie.id,
                    title: movie.title,
                    genre: secondaryGenre ? secondaryGenre.name : 'General Science Fiction',
                    director: director ? director.name : 'Unknown',
                    poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
                    description: movie.overview,
                    releaseDate: movie.release_date,
                    rating: movie.vote_average,
                    popularity: movie.popularity
                  };
                })
              )
            );

            return forkJoin(movieDetails);
          })
        )
      ),
      catchError(this.handleError)
    );
  }

  // Get movie genres from TMDB
  getGenres(): Observable<any> {
    return this.http.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`).pipe(
      catchError(this.handleError)
    );
  }

  // Get movie credits from TMDB
  private getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`).pipe(
      catchError(() => of({ crew: [] }))
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

  // Get user data
  getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Edit user
  editUser(username: string, userDetails: any): Observable<any> {
    return this.http.patch(apiUrl + `users/${username}`, userDetails, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Add/remove favorite movie
  addMovieToFavorites(username: string, movieId: string): Observable<any> {
    console.log('Sending favorite toggle request:', { username, movieId });
    const url = `${apiUrl}users/${username}/favorites`;
    return this.http.post(url, { movieId }, { headers: this.getAuthHeaders() }).pipe(
      map(response => {
        console.log('Favorite toggle response:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Delete user
  deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error('Server error:', error.status, error.error);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}