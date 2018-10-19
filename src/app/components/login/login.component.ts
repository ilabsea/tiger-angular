import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
} from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }
  );

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    if (this.authService.isAdmin()) {
      return this.router.navigate(['/dashboard']);
    }

    this.router.navigate(['/stories']);
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe(
      data => {
        if (this.authService.isAdmin()) {
          return this.router.navigate(['/dashboard']);
        }

        this.router.navigate(['/stories']);
      },
      error => {
        console.log('error', error);
        this._openSnackBar(error.error['errors'], null);
      }
    );
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(SignupDialogComponent, {
        width: '500px',
        data: {}
      });
    }

  _openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
