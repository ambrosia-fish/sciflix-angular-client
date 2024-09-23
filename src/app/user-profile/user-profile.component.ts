/**
 * User Profile Component for the Sci-Flix Angular application.
 * This component handles displaying and editing user profile information.
 * @module UserProfileComponent
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { Injectable } from '@angular/core';

/**
 * Component for user profile management.
 * Allows users to view and edit their profile information.
 */
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
  /** Current user data */
  user: any = {};
  /** Flag to toggle edit mode */
  editMode: boolean = false;
  /** Updated user data */
  updatedUser: any = {};
  /** New password input */
  newPassword: string = '';
  /** Confirm password input */
  confirmPassword: string = '';

  /**
   * @param fetchApiData - Service for API calls
   * @param snackBar - Service for displaying snack bar notifications
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Initializes the component by fetching user data.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetches user data from the API.
   */
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

  /**
   * Toggles edit mode for the profile.
   */
  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.updatedUser = { ...this.user };
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  /**
   * Submits updated user profile information.
   */
  onSubmit(): void {
    if (this.newPassword) {
      if (this.newPassword !== this.confirmPassword) {
        this.snackBar.open('New passwords do not match', 'OK', { duration: 2000 });
        return;
      }
      this.updatedUser.password = this.newPassword;
    }

    this.fetchApiData.updateUser(this.user.username, this.updatedUser).subscribe({
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

  /**
   * Deletes the user account after confirmation.
   */
  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser(this.user.username).subscribe({
        next: () => {
          localStorage.clear();
          this.snackBar.open('Account deleted successfully', 'OK', { duration: 2000 });
          // Navigate to welcome page or login page
        },
        error: (error: any) => {
          console.error('Error deleting user:', error);
          this.snackBar.open('Failed to delete account', 'OK', { duration: 2000 });
        }
      });
    }
  }
}