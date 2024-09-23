/**
 * Genre Dialog Component for the Sci-Flix Angular application.
 * This component displays a dialog with genre information.
 * @module GenreDialogComponent
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for displaying genre information in a dialog.
 */
@Component({
  selector: 'app-genre-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent {
  /**
   * @param dialogRef - Reference to the dialog opened
   * @param data - Data passed to the dialog containing genre information
   */
  constructor(
    public dialogRef: MatDialogRef<GenreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Name: string; Description: string }
  ) {}

  /**
   * Closes the dialog when called.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}