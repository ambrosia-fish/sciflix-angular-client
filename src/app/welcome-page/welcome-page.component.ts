import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  @Output() loginSuccess = new EventEmitter<void>();

  constructor(public dialog: MatDialog) { }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });

    dialogRef.componentInstance.loginSuccess.subscribe(() => {
      this.loginSuccess.emit();
      dialogRef.close();
    });
  }
}