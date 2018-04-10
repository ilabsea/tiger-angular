import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SceneFormComponent } from '../scene-form/scene-form.component';

@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.css']
})
export class ScenesComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  name: string;
  description: string;
  image: string;
  displayedColumns = ['name', 'description', 'image'];
  dataSource = SCENE_DATA;

  constructor(public dialog: MatDialog) {}

  close() {
    this.sidenav.close();
  }

  open() {
    this.sidenav.open();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(SceneFormComponent, {
      width: '500px',
      data: { name: this.name, description: this.description, image: this.image }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      console.log('The dialog was closed');
    });
  }
}

export interface Element {
  id: number;
  name: string;
  description: string;
  image: string;
}

const SCENE_DATA: Element[] = [
  {id: 1, name: 'Scene1', description: 'I go to school', image: '1.png'},
  {id: 2, name: 'Scene2', description: 'I go back home', image: '2.png'},
];
