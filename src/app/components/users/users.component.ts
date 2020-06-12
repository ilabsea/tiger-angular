import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';

import {
  MatTableDataSource,
  MatPaginator,
  PageEvent,
  MatDialog,
  MatSnackBar,
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { UserFormComponent } from './../user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['email', 'role', 'status', 'actions'];
  dataSource: any = [];
  // pageEvent: PageEvent;
  length: number;
  pageSize = 20;
  loading: boolean = true;
  hasData = false;
  statuses: any[] = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Actived', value: 'actived' },
    { label: 'Inactived', value: 'inactived' }];
  status = this.statuses[0];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getUsers(1, this.pageSize);
  }

  getUsers(page: number, perPage: number): void {
    this.userService.getAll({page: page, perPage: perPage}).subscribe(response =>
      {
        this.dataSource = response['users'];
        this.length = response['meta']['pagination']['total_objects'];
        this.loading = false;
        this.hasData = this.hasData || (page == 1 && !!response['users'].length);
      }
    );
  }

  getNextData(event: PageEvent) {
    var page = event.pageIndex + 1;
    var perPage = event.pageSize;
    this.pageSize = perPage;
    this.getUsers(page, perPage);
  }

  filterData() {
    let options = {page: 1, perPage: this.pageSize, status: this.status.value};

    this.userService.getAll(options)
      .subscribe(result => {
        this.length = result['meta']['pagination']['total_objects'];
        this.dataSource = result['users'];
        console.log(this.dataSource);
      });
  }

  delete(user) {
    var result = confirm("Are you sure you want to delete this user?");

    if (!result) { return; }

    this.userService.delete(user.id).subscribe(
      res => {
        this._deleteView(user);
      },
      err => { console.log(err); }
    );
  }

  approve(user) {
    this.userService.update(user.id, this._buildData(user)).subscribe(
      res => {
        this._updateView(res['user']);
        this._openSnackBar('The user aprroved successfully!', null);
      },
      err => {
        console.log(err);
      }
    );
  }

  _buildData(user) {
    return {
      user:  {
        id: user.id,
        status: 'actived'
      }
    }
  }

  openDialog(user=null) {
    if (!!user) {
      this._showDialog(user, this._updateView)
    } else {
      this._showDialog({}, this._appendView);
    }
  }

  copyConfirmLink(user) {
    let str = `${window.location.host}/confirm_email?confirmation_token=${user.confirmation_token}`;
    this.copyToClipboard(str);
    this._openSnackBar('Copied!', null);
  }

  copyToClipboard(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  _showDialog(data, callback) {
    let myData = Object.assign({}, data, { header: 'New User' });

    if (!!data.id) {
      myData.header = 'Edit User';
    }

    let dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: myData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        callback(result);
      }
    });
  }

  _updateView = (result) => {
    let index = this.dataSource.findIndex(item => item.id == result.id);
    this.dataSource[index] = result;
    this.dataSource = this.dataSource.slice();
  }

  _appendView = (result) => {
    this.ngOnInit();
  }

  _deleteView = (result)=> {
    this.ngOnInit();
  }

  _openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
