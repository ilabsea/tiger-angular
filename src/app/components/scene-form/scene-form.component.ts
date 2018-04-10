import { Component, Inject, ngOnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-scene-form',
  templateUrl: './scene-form.component.html',
  styleUrls: ['./scene-form.component.css']
})

export class SceneFormComponent implements ngOnInit {
  // public name: string;
  // public description: string;
  // public imgage: string;

  constructor(
    public dialogRef: MatDialogRef<SceneFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // console.log('data===============', data);
  }

  ngOnInit() {
    // will log the entire data object
    console.log('data===============', this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
