// * Nested Form
// https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {
  myForm: FormGroup;
  submmited: boolean = false;
  archiveChoices: any = [];
  count: number = 0;

  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private questionService: QuestionService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      label: [this.data.label, [Validators.required]],
      choices: this._fb.array([])
    });

    if (!this.data.id) {
      return this.addChoice();
    }

    this._handleSetChoice();
  }

  _handleSetChoice() {
    for(let i=0; i<this.data.choices.length; i++) {
      this.addChoice(this.data.choices[i]);
    }
  }

  initChoice(obj={}) {
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
      let obj = this.myForm.value.choices[i];
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
    let arr = this.myForm.value.choices.filter(obj => !!obj.answered);

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
    let choices = this.myForm.value.choices.slice();
    choices = choices.concat(this.archiveChoices);

    let obj = {
      id: this.data.id,
      label: this.myForm.value.label,
      choices_attributes: choices,
      story_id: this.data.story_id,
    }

    return {
      question: obj
    }
  }
}
