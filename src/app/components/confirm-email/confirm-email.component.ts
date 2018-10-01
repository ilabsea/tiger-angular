import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  errors = '';
  loading: boolean = true;

  ngOnInit() {
    this._confirmEmail();
  }

  goTo(path) {
    this.router.navigate([path]);
  }

  _confirmEmail() {
    this.userService.confirm(this._buildData()).subscribe(
      res => {
        localStorage.setItem('currentUser', JSON.stringify(res['user']));

        if (this.authService.isAdmin()) {
          return this.router.navigate(['/dashboard']);
        }

        this.router.navigate(['/stories']);
      },
      err => {
        this.errors = err.error.errors;
        this.loading = false;
        console.log(err.error.errors);
      }
    );
  }

  _buildData() {
    return {
      user:  {
        confirmation_token: this.route.snapshot.queryParams.confirmation_token,
      }
    }
  }
}
