import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent {
  roles = [ {label: 'Publisher', value: 'publisher'}, { label: 'Admin', value: 'admin' } ];

  form: FormGroup = this.fb.group(
    {
      email: [this.data.email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      role: [this.data.role, Validators.required],
    }
  );

  constructor(public dialogRef: MatDialogRef<UserFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              public userService: UserService) { }

  onSubmit() {
    if (this.form.invalid) { return; }

    if ( this.form.controls.passwordConfirmation.value != this.form.controls.password.value) {
      return this.form.controls.passwordConfirmation.setErrors({mismatch: true});
    }

    if (this.data.id) {
      return this._update();
    }

    this._create();
  }

  _update() {
    this.userService.update(this.data.id, this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res['user']);
      },
      err => {
        this._handleError(err.error);
      }
    );
  }

  _create() {
    this.userService.create(this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res['user']);
      },
      err => {
        this._handleError(err.error);
      }
    );
  }

  _buildData() {
    return {
      user:  {
        id: this.data.id,
        email: this.form.value.email,
        password: this.form.value.password,
        password_confirmation: this.form.value.passwordConfirmation,
        role: this.form.value.role,
        status: 'actived'
      }
    }
  }

  _handleError(error) {
    for (let name in error.errors) {
      this.form.controls[name].setErrors({server: error.errors[name]})
    }
  }
}
