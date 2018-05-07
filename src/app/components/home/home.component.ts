import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedEventService } from '../../services/shared-event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    private sharedEventService: SharedEventService
  ) {
    sharedEventService.changeEmitted$.subscribe(
      text => {
        console.log(text);
        this.sidenav.toggle();
    });
  }

  ngOnInit() {
  }

  closeSideNav() {
    this.sidenav.close();
  }
}
