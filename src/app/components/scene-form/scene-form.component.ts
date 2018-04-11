import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'app-scene-form',
  templateUrl: './scene-form.component.html',
  styleUrls: ['./scene-form.component.css']
})

export class SceneFormComponent {
  name = new FormControl(this.data.name, [Validators.required]);
  description = new FormControl(this.data.description, [Validators.required]);
  image = new FormControl(this.data.image, [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<SceneFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sceneService: SceneService) {
  }

  handleSubmit(): void {
    if (this.name.invalid || this.description.invalid || this.image.invalid) {
      return;
    }

    if (this.data.id) {
      return this._update();
    }

    this._create();
  }

  _update() {
    this.sceneService.updateScene(this.data.id, this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res);
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  _create() {
    this.sceneService.createScene(this._buildData()).subscribe(
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
      scene: {
        id: this.data.id,
        name: this.name.value,
        description: this.description.value,
        image: this.image.value,
        story_id: this.data.story_id
      }
    }
  }
}
