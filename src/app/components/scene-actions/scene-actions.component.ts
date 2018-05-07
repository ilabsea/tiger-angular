import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { SceneActionDialogComponent } from '../scene-action-dialog/scene-action-dialog.component';
import { SceneActionService } from '../../services/scene_action.service';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-scene-actions',
  templateUrl: './scene-actions.component.html',
  styleUrls: ['./scene-actions.component.css']
})
export class SceneActionsComponent implements OnInit, OnDestroy {
  dataSource: any=[];
  loading: boolean = true;
  story_id: any;
  scene_id: string = this.route.snapshot.paramMap.get('scene_id');
  scenes: any = [];
  isAdmin = this.authService.isAdmin();
  private destroy$ = new Subject();

  constructor(
    public dialog: MatDialog,
    private sceneActionService: SceneActionService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dragulaService: DragulaService
  ) {
    dragulaService.drop.asObservable().takeUntil(this.destroy$).subscribe(() => {
      this.onMoveNode();
    });
  }

  ngOnInit() {
    this._getSceneActions();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onMoveNode() {
    let ids = this.dataSource.map(obj => obj['id']);
    this.sceneActionService.updateOrder(this.scene_id, ids)
      .subscribe(res => { console.log(res) });
  }

  delete(obj) {
    var result = confirm("Are you sure you want to delete this action button?");

    if (result) {
      this.sceneActionService.delete(this.scene_id, obj.id).subscribe(
        res => {
          this.loading = true;
          this._getSceneActions();
        },
        err => {
          console.log("Error occured");
        }
      );
    }
  }

  openDialog(obj) {
    if (!!obj) {
      this._showDialog(obj, this._updateView)
    } else {
      this._showDialog({}, this._appendView);
    }
  }

  _showDialog(data, callback = null) {
    let myData = Object.assign({}, data, {
      header: 'New Action',
      story_id: this.story_id,
      scene_id: this.scene_id,
      scenes: this.scenes
    });

    if (!!data.id) {
      myData.header = `Edit ${data.name}`;
    }

    let dialogRef = this.dialog.open(SceneActionDialogComponent, {
      width: '500px',
      data: myData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        !!callback && callback(result.scene_action);
        this.dataSource = this.dataSource.slice();
      }
    });
  }

  _updateView = (result) => {
    let index = this.dataSource.findIndex(item => item.id == result.id);
    this.dataSource[index] = result;
  }

  _appendView = (result) =>  {
    this.dataSource.push(result);
  }

  _getSceneActions() {
    this.sceneActionService.getAll(this.scene_id)
      .subscribe(res => {
        this.loading = false;
        this.dataSource = res['data'];
        this.scenes = res['meta']['scenes'];
        this.story_id = res['meta']['story']['id'];
      });
  }
}
