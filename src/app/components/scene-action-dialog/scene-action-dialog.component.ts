import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { SceneActionService } from '../../services/scene_action.service';

@Component({
  selector: 'app-scene-action-dialog',
  templateUrl: './scene-action-dialog.component.html',
  styleUrls: ['./scene-action-dialog.component.css']
})
export class SceneActionDialogComponent {
  name = new FormControl(this.data.name, [Validators.required]);
  scene_id = new FormControl(this.data.scene_id, [Validators.required]);
  // scenes: any = [{name: 'Scene1'}];

  constructor(
    public dialogRef: MatDialogRef<SceneActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sceneActionService: SceneActionService) {


  }

  handleSubmit(): void {
    if (this.name.invalid || this.scene_id.invalid) {
      return;
    }

    // if (this.data.id) {
    //   return this._update();
    // }

    this._create();
  }

  // _update() {
  //   this.sceneService.update(this.data.story_id, this.data.id, this._buildData()).subscribe(
  //     res => {
  //       this.dialogRef.close(res);
  //     },
  //     err => {
  //       console.log("Error occured");
  //     }
  //   );
  // }

  _create() {
    this.sceneActionService.create(this.data.story_id, this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res);
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  _buildData() {
    return {
      scene_action: {
        id: this.data.id,
        name: this.name.value,
        scene_id: this.scene_id.value
      }
    }
  }

}
