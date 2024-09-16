import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-synopsis-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './synopsis-dialog.component.html',
  styleUrl: './synopsis-dialog.component.scss'
})
export class SynopsisDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SynopsisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; synopsis: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}