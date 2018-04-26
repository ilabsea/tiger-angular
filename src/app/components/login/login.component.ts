import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../services/auth.service';

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
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe(
      data => {
        this.router.navigate(['/stories']);
      },
      error => {
        console.log('error', error);
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
