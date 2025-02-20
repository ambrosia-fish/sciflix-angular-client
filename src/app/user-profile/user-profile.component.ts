import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MovieCardComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  editMode: boolean = false;
  updatedUser: any = {};
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    this.fetchApiData.getUser(username).subscribe({
      next: (response: any) => {
        this.user = response;
        this.updatedUser = { ...this.user };
        this.getFavoriteMovies();
      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies: any[]) => {
        this.favoriteMovies = movies.filter(movie => 
          this.user.favoriteMovies?.includes(movie.id.toString())
        );
      },
      error: (error) => {
        console.error('Error fetching favorite movies:', error);
      }
    });
  }

  handleMovieRemoved(movieId: number): void {
    // Remove the movie from the favoriteMovies array immediately
    this.favoriteMovies = this.favoriteMovies.filter(movie => movie.id !== movieId);
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.updatedUser = { ...this.user };
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  onSubmit(): void {
    if (this.newPassword) {
      if (this.newPassword !== this.confirmPassword) {
        this.snackBar.open('New passwords do not match', 'OK', { duration: 2000 });
        return;
      }
      this.updatedUser.password = this.newPassword;
    }

    this.fetchApiData.editUser(this.user.username, this.updatedUser).subscribe({
      next: (response: any) => {
        this.user = response;
        this.editMode = false;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.snackBar.open('Profile updated successfully', 'OK', { duration: 2000 });
      },
      error: (error: any) => {
        console.error('Error updating user:', error);
        this.snackBar.open('Failed to update profile', 'OK', { duration: 2000 });
      }
    });
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser(this.user.username).subscribe({
        next: () => {
          localStorage.clear();
          this.snackBar.open('Account deleted successfully', 'OK', { duration: 2000 });
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Error deleting user:', error);
          this.snackBar.open('Failed to delete account', 'OK', { duration: 2000 });
        }
      });
    }
  }
}