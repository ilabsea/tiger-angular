import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { AuthService } from './../../services/auth.service';
import { QuestionService } from '../../services/question.service';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  dataSource: any[]=[];
  loading: boolean = true;
  story_id: string = this.route.snapshot.paramMap.get('id');
  isAdmin = this.authService.isAdmin();
  story: any = {};
  endpointUrl = environment.endpointUrl;
  private destroy$ = new Subject();

  constructor(
    public dialog: MatDialog,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dragulaService: DragulaService
  ) {
    dragulaService.drop.asObservable().takeUntil(this.destroy$).subscribe(() => {
      this.onMoveNode();
    });
  }

  ngOnInit() {
    this.getQuestions();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  getQuestions() {
    this.questionService.getAll(this.story_id)
      .subscribe(res => {
        this.loading = false;
        this.dataSource = res['questions'];
        this.story = res['meta']['story'];
      });
  }

  onMoveNode() {
    if (this.isAdmin) { return; }

    let ids = this.dataSource.map(obj => obj['id']);
    this.questionService.updateOrder(this.story_id, ids)
      .subscribe(res => { console.log(res) });
  }

  remove(question) {
    var result = confirm("Are you sure you want to delete this question?");

    if (result) {
      this.questionService.delete(this.story_id, question.id).subscribe(
        res => {
          this.dataSource.splice(this.dataSource.indexOf(question), 1);
          this.dataSource = this.dataSource.slice();
        },
        err => {
          console.log("Error occured");
        }
      );
    }
  }

  openDialog(question): void {
    if (!!question) {
      this._showDialog(question, this._updateView)
    } else {
      let data = { story_id: this.story_id }
      this._showDialog(data, this._appendView);
    }
  }

  _showDialog(data, callback) {
    let myData = Object.assign({}, data, { header: 'New Question' });

    if (!!data.id) {
      myData.header = 'Edit Question';
    }

    let dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '500px',
      data: myData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        callback(result.question);
        this.dataSource = this.dataSource.slice();
      }
    });
  }

  _updateView = (result) => {
    let index = this.dataSource.findIndex(item => item.id == result.id);
    this.dataSource[index] = result;
  }

  _appendView = (result) => {
    this.dataSource.push(result);
  }
}
