import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import { MatSidenav } from '@angular/material/sidenav';
import { SceneActionDialogComponent } from '../scene-action-dialog/scene-action-dialog.component';
import { SceneActionService } from '../../services/scene_action.service';
import { SceneService } from '../../services/scene.service';

const defaultActionMapping: IActionMapping = {
  mouse: {
    click: TREE_ACTIONS.EXPAND,
    dblClick: null,
    contextMenu: null,
    expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
    checkboxClick: TREE_ACTIONS.TOGGLE_SELECTED,
    drop: TREE_ACTIONS.MOVE_NODE
  },
  keys: {
    [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
    [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
    [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
    [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
    [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,
    [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE
  }
};

@Component({
  selector: 'app-scene-actions',
  templateUrl: './scene-actions.component.html',
  styleUrls: ['./scene-actions.component.css']
})
export class SceneActionsComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  dataSource: any=[];
  loading: boolean = true;
  story_id: string = this.route.snapshot.paramMap.get('id');
  scenes: any = [];

  options = {
    allowDrag: true,
    allowDrop: true,
    childrenField: 'nodes',
    actionMapping: defaultActionMapping,
  };

  constructor(
    public dialog: MatDialog,
    private sceneActionService: SceneActionService,
    private route: ActivatedRoute,
    private sceneService: SceneService,
  ) { }

  ngOnInit() {
    this._getSceneActions();
  }

  onMoveNode($event) {
    this.sceneActionService.updateOrder(this.story_id, this.dataSource)
      .subscribe(res => {
        this.dataSource = res;
      });
  }

  edit(obj) {
    console.log('edit', obj)
  }

  delete(obj) {
    var result = confirm("Are you sure you want to delete this action button?");

    if (result) {
      this.sceneActionService.delete(this.story_id, obj.id).subscribe(
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

  addSub(obj) {
    console.log('addSub', obj)
  }

  openDialog() {
    this._showDialog(this._appendView);
  }
  _showDialog(callback = null) {
    let dialogRef = this.dialog.open(SceneActionDialogComponent, {
      width: '500px',
      data: { story_id: this.story_id, scenes: this.scenes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        !!callback && callback(result);
        this.dataSource = this.dataSource.slice();
      }
    });
  }

  _appendView = (result) =>  {
    this.dataSource.push(result);
  }

  _getSceneActions() {
    this.sceneActionService.getAll(this.story_id)
      .subscribe(res => {
        this.loading = false;
        this.dataSource = res.data;
        this.scenes = res.meta.scenes;
      });
  }

  onUpdateData (treeComponent, $event) {
    treeComponent.treeModel.expandAll();
  }
}
