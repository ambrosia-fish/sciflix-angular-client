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

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, GenreDialogComponent, MatDialogModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: string[] = [];
  username: string | null = null;

  constructor(
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUsernameFromStorage();
    this.getFavorites();
  }

  getUsernameFromStorage(): void {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.username = user ? user.username : null;
  }

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

  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

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