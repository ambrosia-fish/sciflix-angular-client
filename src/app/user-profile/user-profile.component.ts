import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  editMode: boolean = false;
  updatedUser: any = {};

  constructor(private fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    this.fetchApiData.getUser(username).subscribe({
      next: (response: any) => {
        this.user = response;
        this.updatedUser = { ...this.user };
      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.updatedUser = { ...this.user };
    }
  }

  onSubmit(): void {
    this.fetchApiData.updateUser(this.user.username, this.updatedUser).subscribe({
      next: (response: any) => {
        this.user = response;
        this.editMode = false;
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      error: (error: any) => {
        console.error('Error updating user:', error);
      }
    });
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser(this.user.username).subscribe({
        next: () => {
          localStorage.clear();
          // Navigate to welcome page or login page
        },
        error: (error: any) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }
}