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
  imageToUpload: File = null;
  audioToUpload: File = null;
  previewImage: any;
  isSubmitted = false;
  remove_image: boolean = false;
  remove_audio: boolean = false;
  endpointUrl = environment.endpointUrl;
  previewAudio: any;

  constructor(
    public dialogRef: MatDialogRef<SceneFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sceneService: SceneService) {

    if (!!this.data.image) {
      this.previewImage = this.endpointUrl + this.data.image;
    }

    if (!!this.data.audio) {
      this.previewAudio = this.endpointUrl + this.data.audio;
    }

  }

  handleFileInput(files: FileList) {
    this.remove_image = false;
    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.previewImage = event.target.result;
      };

      reader.readAsDataURL(files[0]);
    }

    this.imageToUpload = files.item(0);
  }

  handleAudioUpload(files: FileList) {
    this.remove_audio = false;
    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.previewAudio = event.target.result;
      };

      reader.readAsDataURL(files[0]);
    }

    this.audioToUpload = files.item(0);
  }

  deleteImage() {
    this.previewImage = null;
    this.imageToUpload = null;
    this.remove_image = true;
  }

  deleteAudio() {
    this.previewAudio = null;
    this.audioToUpload = null;
    this.remove_audio = true;
  }

  handleSubmit(): void {
    if (this.name.invalid || this.description.invalid) {
      return;
    }

    this.isSubmitted = true;

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
        this.isSubmitted = false;
        console.log('Error occured');
      }
    );
  }

  _create() {
    this.sceneService.create(this.data.story_id, this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res);
      },
      err => {
        this.isSubmitted = false;
        console.log("Error occured");
      }
    );
  }

  _buildData() {
    const formData: FormData = new FormData();

    const data = {
      scene: {
        id: this.data.id,
        name: this.name.value,
        description: this.description.value,
        story_id: this.data.story_id,
        visible_name: this.visible_name.value,
        image_as_background: this.image_as_background.value,
        remove_image: this.remove_image,
        remove_audio: this.remove_audio,
        is_end: this.is_end.value,
      }
    };

    if (!this.data.id) {
      data.scene['scene_actions_attributes'] = [
        { name: 'Next', use_next: true, story_id: this.data.story_id, display_order: 1 }
      ];
    }

    if (!!this.imageToUpload) {
      formData.append('image', this.imageToUpload, this.imageToUpload.name);
    }

    if (!!this.audioToUpload) {
      formData.append('audio', this.audioToUpload, this.audioToUpload.name);
    }

    formData.append("data", JSON.stringify(data));
    return formData;
  }
}
