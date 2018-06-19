import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent {
  reason = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<RejectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storyService: StoryService
  ) { }

  onSubmit() {
    if (this.reason.invalid) {
      return;
    }

    this.storyService.update(this.data.id, this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res['story']);
      },
      err => {
        this._handleError(err.error);
      }
    );
  }

  _handleError = (error) => {
    for (let name in error) {
      this[name].setErrors({server: error[name]})
    }
  }

  _buildData() {
    const formData: FormData = new FormData();

    let data = {
      story: {
        id: this.data.id,
        status: 'rejected',
        reason: this.reason.value
      }
    };

    formData.append('data', JSON.stringify(data));
    return formData;
  }
}
