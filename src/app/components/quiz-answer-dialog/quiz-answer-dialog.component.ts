import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-quiz-answer-dialog',
  templateUrl: './quiz-answer-dialog.component.html',
  styleUrls: ['./quiz-answer-dialog.component.css']
})
export class QuizAnswerDialogComponent  {
  constructor(
    public dialogRef: MatDialogRef<QuizAnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  isCorrect(id, choices) {
    let arr = this._answers(choices).filter(obj => obj.id == id);

    return !!arr.length;
  }

  getAnswers(choices) {
    let arr = this._answers(choices).map(choice => choice.label);
    return arr.join(' / ');
  }

  _answers(choices) {
    return choices.filter(obj => !!obj.answered);
  }
}
