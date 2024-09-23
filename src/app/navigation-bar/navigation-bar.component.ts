/**
 * Navigation Bar Component for the Sci-Flix Angular application.
 * This component handles the navigation bar UI and logout functionality.
 * @module NavigationBarComponent
 */

import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for the navigation bar.
 */
@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  /** Flag to indicate if the user is logged in */
  @Input() isLoggedIn: boolean = false;
  /** Event emitter for logout action */
  @Output() logout = new EventEmitter<void>();

  /** Router for navigation */
  private router = inject(Router);

  /**
   * Handles the logout action.
   * Emits a logout event when called.
   */
  onLogout() {
    this.logout.emit();
  }
}