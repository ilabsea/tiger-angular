import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationTemplateService } from '../../services/notification-template.service';

@Component({
  selector: 'app-notification-setting-dialog',
  templateUrl: './notification-setting-dialog.component.html',
  styleUrls: ['./notification-setting-dialog.component.css']
})

export class NotificationSettingDialogComponent implements OnInit {
  form :FormGroup;
  loading :boolean = true;

  constructor(public dialogRef: MatDialogRef<NotificationSettingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              public notificationService: NotificationTemplateService) { }

  ngOnInit() {
    this.notificationService.getSetting().subscribe(
      res => {
        let data = res['notification_options'];
        this.form = this.fb.group(
          {
            story_enable_pushing: [data.story_enable_pushing, [Validators.required]],
            story_notification_title: [data.story_notification_title, Validators.required],
            story_notification_body: [data.story_notification_body, Validators.required]
          }
        );
        this.loading = false;
      },
      err => {
        // this._handleError(err.error);
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    this._create();
  }

  _create() {
    this.notificationService.createSetting(this._buildData()).subscribe(
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
      setting:  {
        notification_options: {
          story_enable_pushing: this.form.value.story_enable_pushing,
          story_notification_title: this.form.value.story_notification_title,
          story_notification_body: this.form.value.story_notification_body
        }
      }
    }
  }

  _handleError(error) {
    for (let name in error.errors) {
      this.form.controls[name].setErrors({server: error.errors[name]})
    }
  }

  renderTitle() {
    let title = this.form.value.story_notification_title
    title = title.replace(/\{title\}/g, "វាសនានាងមាលា");

    return title || 'Title';
  }

  renderBody() {
    let body = this.form.value.story_notification_body
    body = body.replace(/\{title\}/g, "វាសនានាងមាលា");

    return body || 'Body';
  }

  renderHint() {
    return "Example: We've just published a new story title as story {title}";
  }
}
