import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MovieCardComponent
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  
  // Swipe functionality properties
  currentMovieIndex = 0;
  swipeOffset = 0;
  touchStartX = 0;
  canSwipeLeft = false;
  canSwipeRight = true;

  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => {
        this.movies = resp;
        this.filteredMovies = resp;
        this.updateSwipeIndicators();
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();
    
    if (searchTerm) {
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.director.toLowerCase().includes(searchTerm) ||
        movie.genre.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredMovies = this.movies;
    }
    
    // Reset swipe position when search results change
    this.currentMovieIndex = 0;
    this.swipeOffset = 0;
    this.updateSwipeIndicators();
  }
  
  // Touch event handlers for swipe functionality
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }
  
  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const diffX = touchEndX - this.touchStartX;
    
    // Determine if it was a significant swipe (more than 50px)
    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && this.currentMovieIndex > 0) {
        // Swipe right - go to previous movie
        this.currentMovieIndex--;
      } else if (diffX < 0 && this.currentMovieIndex < this.filteredMovies.length - 1) {
        // Swipe left - go to next movie
        this.currentMovieIndex++;
      }
      
      // Update swipe offset based on current index
      this.swipeOffset = -this.currentMovieIndex * 100 + '%';
      this.updateSwipeIndicators();
    } else {
      // Small movement - reset position
      this.swipeOffset = -this.currentMovieIndex * 100 + '%';
    }
  }
  
  // Navigate to a specific movie by index
  goToMovie(index: number): void {
    this.currentMovieIndex = index;
    this.swipeOffset = -this.currentMovieIndex * 100 + '%';
    this.updateSwipeIndicators();
  }
  
  // Update the visibility of swipe indicators
  updateSwipeIndicators(): void {
    this.canSwipeLeft = this.currentMovieIndex > 0;
    this.canSwipeRight = this.currentMovieIndex < this.filteredMovies.length - 1;
  }
}
