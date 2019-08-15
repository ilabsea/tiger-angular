// * Nested Form
// https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {
  myForm: FormGroup;
  submmited = false;
  archiveChoices: any = [];
  count = 0;
  remove_audio = false;
  remove_educational_message_audio = false;
  previewAudio: any;
  previewEducationalMessageAudio: any;
  audioToUpload: File = null;
  educationalMessageAudioToUpload: File = null;
  endpointUrl = environment.endpointUrl;

  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private questionService: QuestionService,
    private _fb: FormBuilder,
  ) {
    if (!!this.data.audio) {
      this.previewAudio = this.endpointUrl + this.data.audio;
    }

    if (!!this.data.educational_message_audio) {
      this.previewEducationalMessageAudio = this.endpointUrl + this.data.educational_message_audio;
    }
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      label: [this.data.label, [Validators.required]],
      message: [this.data.message],
      choices: this._fb.array([])
    });

    if (!this.data.id) {
      return this.addChoice();
    }

    this._handleSetChoice();
  }

  _handleSetChoice() {
    for (let i = 0; i < this.data.choices.length; i++) {
      this.addChoice(this.data.choices[i]);
    }
  }

  initChoice(obj= {}) {
    this.count++;

    return this._fb.group({
      _id: this.count,
      id: [obj['id']],
      label: [obj['label'], Validators.required],
      answered: [obj['answered']]
    });
  }

  addChoice(obj={}) {
    const control = <FormArray>this.myForm.controls['choices'];
    control.push(this.initChoice(obj));
  }

  removeChoice(i: number) {
    this._handleArchivedChoice(i);

    const control = <FormArray>this.myForm.controls['choices'];
    control.removeAt(i);
  }

  _handleArchivedChoice(i) {
    if (!!this.myForm.value.choices[i].id) {
      const obj = this.myForm.value.choices[i];
      obj['_destroy'] = true;

      this.archiveChoices.push(obj);
    }
  }

  handleSubmit(): void {
    this.submmited = true;
    if (this.myForm.invalid || this.noAnswerSelected()) {
      return;
    }

    if (this.data.id) {
      return this._update();
    }

    this._create();
  }

  noAnswerSelected() {
    const arr = this.myForm.value.choices.filter(obj => !!obj.answered);

    return !arr.length;
  }

  _update() {
    this.questionService.update(this.data.story_id, this.data.id, this._buildData())
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
    this.questionService.create(this.data.story_id, this._buildData())
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
    const formData: FormData = new FormData();

    let choices = this.myForm.value.choices.slice();
    choices = choices.concat(this.archiveChoices);

    const data = {
      question: {
        id: this.data.id,
        label: this.myForm.value.label,
        message: this.myForm.value.message,
        choices_attributes: choices,
        story_id: this.data.story_id,
        remove_audio: this.remove_audio,
        remove_educational_message_audio: this.remove_educational_message_audio
      }
    };

    if (!!this.audioToUpload) {
      formData.append('audio', this.audioToUpload, this.audioToUpload.name);
    }

    if (!!this.educationalMessageAudioToUpload) {
      formData.append('educational_message_audio', this.educationalMessageAudioToUpload, this.educationalMessageAudioToUpload.name);
    }

    formData.append('data', JSON.stringify(data));

    return formData;
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

  handleEducationalMessageAudioUpload(files: FileList) {
    this.remove_educational_message_audio = false;

    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.previewEducationalMessageAudio = event.target.result;
      };

      reader.readAsDataURL(files[0]);
    }

    this.educationalMessageAudioToUpload = files.item(0);
  }

  deleteAudio() {
    this.previewAudio = null;
    this.audioToUpload = null;
    this.remove_audio = true;
  }

  deleteEducationalMessageAudio() {
    this.previewEducationalMessageAudio = null;
    this.educationalMessageAudioToUpload = null;
    this.remove_educational_message_audio = true;
  }
}
