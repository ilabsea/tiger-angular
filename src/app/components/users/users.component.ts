import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { USERS } from '../../mocks/mock-users';

import {MatTableDataSource, MatPaginator, PageEvent, MatDialog} from '@angular/material';
// import {DataSource} from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import {UserFormComponent} from './../user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  displayedColumns = ['email', 'role', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  pageEvent: PageEvent;
  length = 100;
  pageSize = 50;
  pageNumber = 1;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, public dialog: MatDialog,) {

  }

  ngOnInit() {
    this.getUsers(this.pageNumber, this.pageSize);
  }

  getUsers(page: number, perPage: number): void {
    this.userService.getUsers(page, perPage).subscribe(response =>
      {
        this.dataSource.data = response['users'];
        this.length = response['meta']['pagination']['total_objects'];
        this.pageNumber = page - 1;
      }
    );
  }

  getNextData(event: PageEvent){
    var page = event.pageIndex + 1;
    var perPage = event.pageSize;
    this.getUsers(page, perPage);
  }

  addUser(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {user: User }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  viewUser(id){
    console.log('view user_id ', id);
  }

  editUser(id){
    console.log('edit user_id ', id);
  }

  deleteUser(id){
    console.log('delete user_id ', id);
  }
}
