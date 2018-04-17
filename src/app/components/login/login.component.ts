import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.authService.logout();
    this.form = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe(
      data => { this.router.navigate(['/stories']); },
      error => {
        console.log(error);
        console.log(error['error']['errors'])
        // this.openSnackBar(error['error']['errors']);
        // this.alertService.error(error['error']['errors']);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
