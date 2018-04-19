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
  link_scene_id = new FormControl(this.data.link_scene_id, [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<SceneActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sceneActionService: SceneActionService) {
  }

  handleSubmit(): void {
    if (this.name.invalid || this.link_scene_id.invalid) {
      return;
    }

    if (this.data.id) {
      return this._update();
    }

    this._create();
  }

  _update() {
    this.sceneActionService.update(this.data.story_id, this.data.scene_id, this.data.id, this._buildData())
      .subscribe(
        res => {
          this.dialogRef.close(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  _create() {
    this.sceneActionService.create(this.data.story_id, this.data.scene_id, this._buildData())
      .subscribe(
        res => {
          this.dialogRef.close(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  _buildData() {
    return {
      scene_action: {
        id: this.data.id,
        name: this.name.value,
        link_scene_id: this.link_scene_id.value,
        scene_id: this.data.scene_id,
        story_id: this.data.story_id
      }
    }
  }
}
