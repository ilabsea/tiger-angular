import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SceneFormComponent } from '../scene-form/scene-form.component';
import { Scene } from '../../models/scene';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'app-scene-actions',
  templateUrl: './scene-actions.component.html',
  styleUrls: ['./scene-actions.component.css']
})
export class SceneActionsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  dataSource: any=[];
  loading: boolean = true;
  story_id: string = this.route.snapshot.paramMap.get('id');

  constructor(
    public dialog: MatDialog,
    private sceneService: SceneService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = false;
  }

  close() {
    this.sidenav.close();
  }

  open() {
    this.sidenav.open();
  }

}
