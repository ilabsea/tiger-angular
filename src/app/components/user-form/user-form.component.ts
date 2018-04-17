import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent {
  roles = [
    {label: 'admin', value: 0},
    {label: 'publisher', value: 1}
  ];

  constructor(public dialogRef: MatDialogRef<UserFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              public userService: UserService) { }

  formControl = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
    console.log(this.formControl);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUser(){
    console.log('add user');
    console.log(this.formControl);
  }

  public confirmAdd(): void {
    this.userService.addUser(this.data);
  }


}
