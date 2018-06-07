import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { StoryService } from '../../services/story.service';

import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.css']
})
export class StoryDialogComponent {
  title = new FormControl(this.data.title, [Validators.required]);
  description = new FormControl(this.data.description, [Validators.required]);
  image = new FormControl(this.data.image, [Validators.required]);

  fileToUpload: File = null;
  previewUrl: any;
  separatorKeysCodes = [ENTER, COMMA];
  tags = (this.data.tags || []).slice();
  removedTags: any = [];
  showError: boolean = false;
  isSubmitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<StoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storyService: StoryService) {

    if(!!this.data.image) {
      // this.previewUrl = 'http://192.168.1.107:3000' + this.data.image;
      this.previewUrl = this.data.image;
    }
  }

  onBlur() {
    this.showError = !this.tags.length;
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    let isTagExisted = !!this.tags.filter(tag => tag.title == value).length

    // Add our tag
    if ((value || '').trim() && !isTagExisted) {
      this.tags.push({title: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.onBlur();
  }

  remove(tag: any): void {
    let index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.removedTags.push(Object.assign({_destroy: true}, tag));
    }

    this.onBlur();
  }

  filterTags() {
    this.tags.filter(tag => !tag['_delete'])
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
    this.onBlur();
    this.isSubmitted = true;

    if (this.title.invalid ||
        this.description.invalid ||
        !this.previewUrl ||
        !this.tags.length) {
      return;
    }

    if (this.data.id) {
      return this._update();
    }

    this._create();
  }

  _update() {
    this.storyService.update(this.data.id, this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res['story']);
      },
      err => {
        this._handleError(err.error);
      }
    );
  }

  _handleError = (error) => {
    for (let name in error) {
      this[name].setErrors({server: error[name]})
    }
  }

  _create() {
    this.storyService.create(this._buildData()).subscribe(
      res => {
        this.dialogRef.close(res['story']);
      },
      err => {
        console.log(err);
        this._handleError(err.error);
      }
    );
  }

  _buildData() {
    const formData: FormData = new FormData();

    let data = {
      story: {
        id: this.data.id,
        title: this.title.value,
        description: this.description.value,
        story_id: this.data.story_id,
        tags_attributes: this.tags.concat(this.removedTags)
      }
    };

    if (!!this.fileToUpload) {
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
    }

    formData.append('data', JSON.stringify(data));
    return formData;
  }
}
