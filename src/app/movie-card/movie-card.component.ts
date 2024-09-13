import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, GenreDialogComponent, MatDialogModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => {
        this.movies = resp;
        console.log(this.movies);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }
  openGenreDialog(genreName: string): void {
    const genre = this.movies.find(movie => movie.Genre.Name === genreName)?.Genre;
    if (genre) {
      this.dialog.open(GenreDialogComponent, {
        width: '250px',
        data: { Name: genre.Name, Description: genre.Description }
      });
    } else {
      console.error(`Genre ${genreName} not found`);
    }
  }
}