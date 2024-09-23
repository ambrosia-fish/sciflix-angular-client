/**
 * Director Dialog Component for the Sci-Flix Angular application.
 * This component displays a dialog with director information.
 * @module DirectorDialogComponent
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for displaying director information in a dialog.
 */
@Component({
  selector: 'app-director-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent {
  /**
   * @param dialogRef - Reference to the dialog opened
   * @param data - Data passed to the dialog containing director information
   */
  constructor(
    public dialogRef: MatDialogRef<DirectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Name: string; Bio: string }
  ) {}

  /**
   * Closes the dialog when called.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}