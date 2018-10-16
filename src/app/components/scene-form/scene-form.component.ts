import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { SceneService } from '../../services/scene.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-scene-form',
  templateUrl: './scene-form.component.html',
  styleUrls: ['./scene-form.component.css']
})

export class SceneFormComponent {
  name = new FormControl(this.data.name, [Validators.required]);
  description = new FormControl(this.data.description, [Validators.required]);
  image = new FormControl(this.data.image, [Validators.required]);
  visible_name = new FormControl(this.data.visible_name);
  image_as_background = new FormControl(this.data.image_as_background);
  is_end = new FormControl(this.data.is_end);
  fileToUpload: File = null;
  previewUrl: any;
  isSubmitted: boolean = false;
  remove_image: boolean = false;
  endpointUrl = environment.endpointUrl;

  constructor(
    public dialogRef: MatDialogRef<SceneFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sceneService: SceneService) {

    if(!!this.data.image) {
      // this.previewUrl = 'http://192.168.1.107:3000' + this.data.image;
      this.previewUrl = this.endpointUrl + this.data.image;
    }
  }

  handleFileInput(files: FileList) {
    this.remove_image = false;
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.previewUrl = event.target.result;
      }

      reader.readAsDataURL(files[0]);
    }

    this.fileToUpload = files.item(0);
  }

  deleteImage() {
    this.previewUrl = null;
    this.fileToUpload = null;
    this.remove_image = true;
  }

  handleSubmit(): void {
    this.isSubmitted = true;

    if (this.name.invalid || this.description.invalid) {
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
        story_id: this.data.story_id,
        visible_name: this.visible_name.value,
        image_as_background: this.image_as_background.value,
        remove_image: this.remove_image,
        is_end: this.is_end.value,
      }
    };

    if (!this.data.id) {
      data.scene['scene_actions_attributes'] = [
        { name: 'Next', use_next: true, story_id: this.data.story_id, display_order: 1 }
      ];
    }

    if (!!this.fileToUpload) {
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
    }

    formData.append("data", JSON.stringify(data));
    return formData;
  }
}
