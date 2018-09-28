import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent {
  form: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    }
  );

  constructor(public dialogRef: MatDialogRef<SignupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder, public snackBar: MatSnackBar
              public userService: UserService) { }

  onSubmit() {
    if (this.form.invalid) { return; }

    if ( this.form.controls.passwordConfirmation.value != this.form.controls.password.value) {
      return this.form.controls.passwordConfirmation.setErrors({mismatch: true});
    }

    this._create();
  }

  _create() {
    this.userService.create(this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res['user']);
        this._openSnackBar('Your request submitted successfully!', null);
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
        role: 'publisher',
        status: 'pending',
      }
    }
  }

  _handleError(error) {
    for (let name in error.errors) {
      this.form.controls[name].setErrors({server: error.errors[name]})
    }
  }

  _openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
