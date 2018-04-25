import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import { MatSidenav } from '@angular/material/sidenav';
import { SceneActionDialogComponent } from '../scene-action-dialog/scene-action-dialog.component';
import { SceneActionService } from '../../services/scene_action.service';

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
  story_id: any;
  scene_id: string = this.route.snapshot.paramMap.get('scene_id');
  scenes: any = [];

  options = {
    allowDrag: true,
    allowDrop: (element, { parent, index }) => {
      return parent.hasChildren;
    },
    actionMapping: defaultActionMapping
  };

  constructor(
    public dialog: MatDialog,
    private sceneActionService: SceneActionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._getSceneActions();
  }

  onMoveNode($event) {
    this.sceneActionService.updateOrder(this.scene_id, this.dataSource)
      .subscribe(res => {
        this.dataSource = res['scene_actions'];
      });
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
