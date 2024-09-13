import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../services/fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(private fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => {
        this.movies = resp;
        console.log(this.movies);
      },
      error: (error: any) => {
        console.error('Error fetching movies:', error);
      }
    });
  }
}