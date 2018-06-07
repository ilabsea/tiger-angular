import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-date-range-dialog',
  templateUrl: './custom-date-range-dialog.component.html',
  styleUrls: ['./custom-date-range-dialog.component.css']
})
export class CustomDateRangeDialogComponent {
  from = new FormControl({value: new Date(this.data.from || new Date()), disabled: true}, Validators.required);
  to = new FormControl({value: new Date(this.data.to || new Date()), disabled: true}, Validators.required);
  maxDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<CustomDateRangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  handleSubmit() {
    this.dialogRef.close({from: this.from.value, to: this.to.value});
  }
}
