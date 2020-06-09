import { Component, OnInit } from '@angular/core';

import {
  MatTableDataSource,
  MatPaginator,
  PageEvent,
  MatDialog,
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';

import { NotificationTemplateFormComponent } from './../notification-template-form/notification-template-form.component';
import { NotificationTemplateService } from '../../services/notification-template.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-notification-template',
  templateUrl: './notification-template.component.html',
  styleUrls: ['./notification-template.component.css']
})

export class NotificationTemplateComponent implements OnInit {
  loading: boolean = true;
  notifications: any = [];
  isAdmin = this.authService.isAdmin();
  totalCount: number;
  displayedColumns = ['uuid', 'created_at', 'title', 'body', 'by', 'success_count', 'failure_count'];
  pageSize: number = 20;

  constructor(
    public dialog: MatDialog,
    public notificationService: NotificationTemplateService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getNotifications(1, this.pageSize);
  }

  getNotifications(page: number, pageSize: number): void {
    this.notificationService.getAll({page: page})
      .subscribe(result => {
        this.totalCount = result['meta']['pagination']['total_objects'];
        this.notifications = result['notifications'];
        console.log(this.notifications);
        this.loading = false;
      });
  }

  openDialog() {
    let myData = Object.assign({}, { header: 'New Notification' });

    let dialogRef = this.dialog.open(NotificationTemplateFormComponent, {
      width: '500px',
      data: myData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this._updateView(result);
      }
    });
  }

  getNextData(event: PageEvent) {
    var page = event.pageIndex + 1;
    var perPage = event.pageSize;
    this.pageSize = perPage;
    this.getNotifications(page, perPage);
  }

  renderCount(count) {
    if (count == 0 || count > 0) {
      return count;
    }

    return '-';
  }

  _updateView = (result) => {
    this.ngOnInit();
  }
}
