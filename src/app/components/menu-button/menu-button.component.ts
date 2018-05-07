import { Component, OnInit } from '@angular/core';
import { SharedEventService } from '../../services/shared-event.service';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent implements OnInit {

  constructor(private sharedEventService: SharedEventService) { }

  ngOnInit() {
  }

  toggleMenu() {
    this.sharedEventService.emitChange('Data from child');
  }

}
