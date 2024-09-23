/**
 * Synopsis Dialog Component for the Sci-Flix Angular application.
 * This component displays a dialog with a movie's synopsis.
 * @module SynopsisDialogComponent
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for displaying a movie synopsis in a dialog.
 */
@Component({
  selector: 'app-synopsis-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './synopsis-dialog.component.html',
  styleUrl: './synopsis-dialog.component.scss'
})
export class SynopsisDialogComponent {
  /**
   * @param dialogRef - Reference to the dialog opened
   * @param data - Data passed to the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<SynopsisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; synopsis: string }
  ) {}

  /**
   * Closes the dialog when called.
   */
  onClose(): void {
    this.dialogRef.close();
  }
}