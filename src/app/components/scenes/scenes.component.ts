import { Component, ViewChild, ngOnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SceneFormComponent } from '../scene-form/scene-form.component';
import { Scene } from '../../models/scene';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.css']
})

export class ScenesComponent implements ngOnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  name: string;
  description: string;
  image: string;
  displayedColumns = ['name', 'description', 'image', 'actions'];
  dataSource: Scene[]=[];
  loading: boolean = true;
  story_id: string = this.route.snapshot.paramMap.get('id');

  constructor(
    public dialog: MatDialog,
    private sceneService: SceneService,
    private route: ActivatedRoute
  ) {
    let that = this;
  }

  ngOnInit() {
    this.getScenes();
  }

  getScenes(): void {
    this.sceneService.getScenes(this.story_id)
      .subscribe(scenes => {
        this.loading = false;
        this.dataSource = scenes
      });
  }

  close() {
    this.sidenav.close();
  }

  open() {
    this.sidenav.open();
  }

  remove(scene) {
    var result = confirm("Are you sure you want to delete this scene?");

    if (result) {
      this.sceneService.deleteScene(this.story_id, scene.id).subscribe(
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
      let data = { name: '', description: '', image: '', story_id: 1}
      this._showDialog(data, this._appendScene);
    }
  }

  _showDialog(data, callback) {
    let dialogRef = this.dialog.open(SceneFormComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        callback(result);
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
