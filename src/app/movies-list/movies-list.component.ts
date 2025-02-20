import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MovieCardComponent
  ],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  movies: any[] = [];
  currentPage = 1;
  loading = false;
  hasMore = true;
  searchQuery = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private fetchApiData: FetchApiDataService) {
    this.searchSubject.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.searchQuery = query;
      this.currentPage = 1;
      this.hasMore = true;
      this.movies = [];
      this.getMovies();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.loading || !this.hasMore) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 200) {
      this.loadMore();
    }
  }

  ngOnInit(): void {
    this.getMovies();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMovies(): void {
    if (this.loading || (!this.hasMore && !this.searchQuery)) return;

    this.loading = true;
    this.fetchApiData.getAllMovies(this.currentPage, this.searchQuery).subscribe({
      next: (movies: any) => {
        this.movies = this.currentPage === 1 ? movies : [...this.movies, ...movies];
        this.loading = false;
        this.hasMore = movies.length > 0;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.loading = false;
      }
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  loadMore(): void {
    if (!this.loading && this.hasMore) {
      this.currentPage++;
      this.getMovies();
    }
  }
}