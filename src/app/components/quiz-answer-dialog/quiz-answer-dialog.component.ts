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

  getAnswer(choices) {
    return choices.find(function(choice) {
      return choice.answered == true;
    });
  }
}
