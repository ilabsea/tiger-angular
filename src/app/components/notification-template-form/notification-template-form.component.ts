import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationTemplateService } from '../../services/notification-template.service';

@Component({
  selector: 'app-notification-template-form',
  templateUrl: './notification-template-form.component.html',
  styleUrls: ['./notification-template-form.component.css']
})

export class NotificationTemplateFormComponent {
  form: FormGroup = this.fb.group(
    {
      title: [this.data.title, [Validators.required, Validators.maxLength(70)]],
      body: [this.data.body, [Validators.maxLength(140)]],
    }
  );

  constructor(public dialogRef: MatDialogRef<NotificationTemplateFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              public notificationService: NotificationTemplateService) { }

  onSubmit() {
    if (this.form.invalid) { return; }

    this._create();
  }

  _create() {
    this.notificationService.create(this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res);
      },
      err => {
        this._handleError(err.error);
      }
    );
  }

  _buildData() {
    return {
      notification:  {
        title: this.form.value.title,
        body: this.form.value.body,
      }
    }
  }

  _handleError(error) {
    for (let name in error.errors) {
      this.form.controls[name].setErrors({server: error.errors[name]})
    }
  }

  renderTitle() {
    return this.form.value.title || 'Notification title';
  }

  renderBody() {
    return this.form.value.body || 'Notification text';
  }
}
