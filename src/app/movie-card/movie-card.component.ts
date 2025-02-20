import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any;
  @Output() movieRemoved = new EventEmitter<number>();
  username: string | null = null;
  favorites: string[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUsernameFromStorage();
    if (this.username) {
      this.loadFavorites();
    }
  }

  getUsernameFromStorage(): void {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.username = user ? user.username : null;
  }

  loadFavorites(): void {
    if (this.username) {
      this.fetchApiData.getUser(this.username).subscribe({
        next: (user: any) => {
          this.favorites = user.favoriteMovies || [];
        },
        error: (error) => {
          console.error('Error fetching favorites:', error);
        }
      });
    }
  }

  isFavorite(movieId: number): boolean {
    return this.favorites.includes(movieId.toString());
  }

  toggleFavorite(movieId: number): void {
    if (!this.username) {
      this.snackBar.open('Please log in to add favorites', 'OK', { duration: 2000 });
      return;
    }

    this.fetchApiData.addMovieToFavorites(this.username, movieId.toString()).subscribe({
      next: (response: any) => {
        this.favorites = response.favorites || [];
        const isNowFavorite = this.favorites.includes(movieId.toString());
        
        this.snackBar.open(
          isNowFavorite ? 'Movie added to favorites' : 'Movie removed from favorites',
          'OK',
          { duration: 2000 }
        );

        // Emit event when movie is removed from favorites
        if (!isNowFavorite) {
          this.movieRemoved.emit(movieId);
        }
      },
      error: (error) => {
        console.error('Error toggling favorite:', error);
        this.snackBar.open('Error updating favorites', 'OK', { duration: 2000 });
      }
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '400px',
      data: {
        title: movie.title,
        synopsis: movie.description
      }
    });
  }
}