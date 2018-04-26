import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() navBarEvent = new EventEmitter<String>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goTo(path) {
    this.router.navigate([path]);
    this._closeSideNav();
  }

  // https://stackoverflow.com/questions/44469330/call-a-parent-component-function-from-a-child-component-in-angular
  // https://stackoverflow.com/questions/35940984/angular2-call-function-of-parent-component
  _closeSideNav() {
    this.navBarEvent.emit('close');
  }
}
