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
  fileToUpload: File = null;
  previewUrl: any;

  constructor(
    public dialogRef: MatDialogRef<SceneFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sceneService: SceneService) {

    if(!!this.data.image) {
      this.previewUrl = 'http://192.168.1.107:3000' + this.data.image.url;
    }
  }

  handleFileInput(files: FileList) {
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.previewUrl = event.target.result;
      }

      reader.readAsDataURL(files[0]);
    }

    this.fileToUpload = files.item(0);
  }

  handleSubmit(): void {
    if (this.name.invalid || this.description.invalid || !this.previewUrl) {
      return;
    }

    if (this.data.id) {
      return this._update();
    }

    this._create();
  }

  _update() {
    this.sceneService.update(this.data.story_id, this.data.id, this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res);
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  _create() {
    this.sceneService.create(this.data.story_id, this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res);
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  _buildData() {
    const formData: FormData = new FormData();

    let data = {
      scene: {
        id: this.data.id,
        name: this.name.value,
        description: this.description.value,
        story_id: this.data.story_id
      }
    };

    if (!!this.fileToUpload) {
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
    }

    formData.append("data", JSON.stringify(data));
    return formData;
  }
}
