/**
 * Movie Card Component for the Sci-Flix Angular application.
 * This component handles displaying movie information and user interactions.
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

/**
 * Component for displaying movie cards and handling related user interactions.
 */
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, GenreDialogComponent, MatDialogModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /** Array to store movie data */
  movies: any[] = [];
  /** Array to store user's favorite movie IDs */
  favorites: string[] = [];
  /** Current user's username */
  username: string | null = null;

  /**
   * @param fetchApiData - Service for API calls
   * @param dialog - Service for opening dialogs
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  /**
   * Initializes the component, fetching movies and user data.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUsernameFromStorage();
    this.getFavorites();
  }

  /**
   * Retrieves the username from local storage.
   */
  getUsernameFromStorage(): void {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.username = user ? user.username : null;
  }

  /**
   * Fetches all movies from the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => {
        this.movies = resp;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  /**
   * Fetches the user's favorite movies.
   */
  getFavorites(): void {
    if (this.username) {
      this.fetchApiData.getUser(this.username).subscribe({
        next: (user: any) => {
          this.favorites = user.favoriteMovies;
        },
        error: (error) => {
          console.error('Error fetching favorites:', error);
        }
      });
    }
  }

  /**
   * Checks if a movie is in the user's favorites.
   * @param movieId - The ID of the movie to check
   * @returns True if the movie is a favorite, false otherwise
   */
  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  /**
   * Toggles a movie's favorite status for the current user.
   * @param movieId - The ID of the movie to toggle
   */
  toggleFavorite(movieId: string): void {
    if (this.username) {
      this.fetchApiData.addRemoveFavoriteMovie(this.username, movieId).subscribe({
        next: (resp: any) => {
          if (resp.FavoriteMovies) {
            this.favorites = resp.FavoriteMovies;
          } else {
            const index = this.favorites.indexOf(movieId);
            if (index === -1) {
              this.favorites.push(movieId);
            } else {
              this.favorites.splice(index, 1);
            }
          }
        },
        error: (error) => {
          console.error('Error toggling favorite:', error);
        }
      });
    } else {
      console.error('Username not found in storage');
    }
  }

  /**
   * Opens a dialog displaying genre information.
   * @param genreName - The name of the genre
   */
  openGenreDialog(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe({
      next: (genre: any) => {
        this.dialog.open(GenreDialogComponent, {
          width: '250px',
          data: { Name: genreName, Description: genre.genreDescription }
        });
      },
      error: (error) => {
        console.error(`Error fetching genre ${genreName}:`, error);
      }
    });
  }

  /**
   * Opens a dialog displaying director information.
   * @param directorName - The name of the director
   */
  openDirectorDialog(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe({
      next: (director: any) => {
        this.dialog.open(DirectorDialogComponent, {
          width: '250px',
          data: director
        });
      },
      error: (error) => {
        console.error(`Error fetching director ${directorName}:`, error);
      }
    });
  }

  /**
   * Opens a dialog displaying the movie synopsis.
   * @param movieTitle - The title of the movie
   */
  openSynopsisDialog(movieTitle: string): void {
    this.fetchApiData.getOneMovie(movieTitle).subscribe({
      next: (movie: any) => {
        this.dialog.open(SynopsisDialogComponent, {
          width: '400px',
          data: {
            title: movie.Title,
            synopsis: movie.Description
          }
        });
      },
      error: (error) => {
        console.error(`Error fetching movie ${movieTitle}:`, error);
      }
    });
  }
}