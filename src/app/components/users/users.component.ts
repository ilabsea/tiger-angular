import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { USERS } from '../../mocks/mock-users';

import { MatTableDataSource, MatPaginator, PageEvent, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { UserFormComponent } from './../user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: User[];
  displayedColumns = ['email', 'role', 'status', 'actions'];
  dataSource: any = [];
  pageEvent: PageEvent;
  length: number;
  pageSize = 20;
  loading: boolean = true;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getUsers(1, this.pageSize);
  }

  getUsers(page: number, perPage: number): void {
    this.userService.getAll(page, perPage).subscribe(response =>
      {
        this.dataSource = response['users'];
        this.length = response['meta']['pagination']['total_objects'];
        this.loading = false;
      }
    );
  }

  getNextData(event: PageEvent) {
    var page = event.pageIndex + 1;
    var perPage = event.pageSize;
    this.getUsers(page, perPage);
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

  openDialog(user): void {
    if (!!user) {
      this._showDialog(user, this._updateView)
    } else {
      this._showDialog({}, this._appendView);
    }
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
}
