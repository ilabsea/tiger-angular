import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { SceneFormComponent } from '../scene-form/scene-form.component';
import { Scene } from '../../models/scene';
import { SceneService } from '../../services/scene.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.css']
})

export class ScenesComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'description', 'image', 'actions', 'method'];
  dataSource: Scene[]=[];
  loading: boolean = true;
  story_id: string = this.route.snapshot.paramMap.get('id');
  isAdmin = this.authService.isAdmin();
  private destroy$ = new Subject();

  constructor(
    public dialog: MatDialog,
    private sceneService: SceneService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dragulaService: DragulaService
  ) {
    dragulaService.drop.asObservable().takeUntil(this.destroy$).subscribe(() => {
      this.onMoveNode();
    });
  }

  ngOnInit() {
    this.getScenes();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onMoveNode() {
    let ids = this.dataSource.map(obj => obj['id']);
    this.sceneService.updateOrder(this.story_id, ids)
      .subscribe(res => { console.log(res) });
  }

  getScenes(): void {
    this.sceneService.getAll(this.story_id)
      .subscribe(res => {
        this.loading = false;
        this.dataSource = res['scenes'];
      });
  }

  remove(scene) {
    var result = confirm("Are you sure you want to delete this scene?");

    if (result) {
      this.sceneService.delete(this.story_id, scene.id).subscribe(
        res => {
          this.dataSource.splice(this.dataSource.indexOf(scene), 1);
          this.dataSource = this.dataSource.slice();
        },
        err => {
          console.log("Error occured");
        }
      );
    }
  }

  openDialog(scene): void {
    if (!!scene) {
      this._showDialog(scene, this._updateScene)
    } else {
      let data = { story_id: this.story_id }
      this._showDialog(data, this._appendScene);
    }
  }

  _showDialog(data, callback) {
    let myData = Object.assign({}, data, { header: 'New Scene' });

    if (!!data.id) {
      myData.header = `Edit ${data.name}`;
    }

    let dialogRef = this.dialog.open(SceneFormComponent, {
      width: '500px',
      data: myData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        callback(result.scene);
        this.dataSource = this.dataSource.slice();
      }
    });
  }

  _updateScene = (result) => {
    let index = this.dataSource.findIndex(item => item.id == result.id);
    this.dataSource[index] = result;
  }

  _appendScene = (result) => {
    this.dataSource.push(result);
  }
}
