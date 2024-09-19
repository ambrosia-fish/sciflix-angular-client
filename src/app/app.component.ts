import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CommonModule } from '@angular/common';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, CommonModule, UserLoginFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isWelcomePage: boolean = true;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    public authService: AuthService
  ) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isWelcomePage = event.urlAfterRedirects === '/welcome';
    });
  }

  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}