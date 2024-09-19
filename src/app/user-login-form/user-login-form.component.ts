import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  userData = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<UserLoginFormComponent>,
    private snackBar: MatSnackBar
  ) {}

  loginUser(): void {
    this.authService.login(this.userData.username, this.userData.password).subscribe({
      next: () => {
        this.snackBar.open('Login successful', 'OK', { duration: 2000 });
        this.loginSuccess.emit();
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Login error', error);
        this.snackBar.open('Login failed', 'OK', { duration: 5000 });
      }
    });
  }
}