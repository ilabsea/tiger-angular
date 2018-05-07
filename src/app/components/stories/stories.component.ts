import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { StoryService } from '../../services/story.service';
import { AuthService } from './../../services/auth.service';
import { StoryDialogComponent } from '../story-dialog/story-dialog.component';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { DeactivateDialogComponent } from '../deactivate-dialog/deactivate-dialog.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  displayedColumns = ['name', 'description', 'tags', 'image', 'status', 'actions'];
  dataSource: any=[];
  loading: boolean = true;
  pageEvent: PageEvent;
  length: number;
  pageSize = 20;
  isAdmin = this.authService.isAdmin();

  constructor(
    public dialog: MatDialog,
    private storyService: StoryService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getStories(1, this.pageSize);
  }

  getStories(page: number, perPage: number): void {
    this.storyService.getAll(page, perPage)
      .subscribe(result => {
        this.length = result['meta']['pagination']['total_objects'];
        this.dataSource = result['stories'];
        this.loading = false;
      });
  }

  getNextData(event: PageEvent) {
    var page = event.pageIndex + 1;
    var perPage = event.pageSize;
    this.pageSize = perPage;
    this.getStories(page, perPage);
  }

  publish(story) {
    var result = confirm("Are you sure you want to publish this story as you may not be able to modify it anymore?");

    if (!result) { return; }

    this.storyService.update(story.id, this._buildData(story, {status: 'published'})).subscribe(
      res => {
        this._updateView(res['story']);
      },
      err => {
        console.log(err);
      }
    );
  }

  unpublish(story) {
    this.storyService.update(story.id, this._buildData(story, {status: 'unpublished'})).subscribe(
      res => {
        this._updateView(res['story']);
      },
      err => {
        console.log(err);
      }
    );
  }

  clone(story) {
    this.storyService.clone(story.id, {}).subscribe(
      res => {
        this._appendView(res['story']);
      },
      err => {
        console.log(err);
      }
    );
  }

  showReason(story) {
    let dialogRef = this.dialog.open(PopupDialogComponent, {
      width: '500px',
      data: { title: 'Deactivated Reason', message: story.reason }
    });
  }

  confirmDeactivate(story) {
    let dialogRef = this.dialog.open(DeactivateDialogComponent, {
      width: '500px',
      data: story
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this._deactivate(result);
      }
    });
  }

  _deactivate = (story) => {
    this.storyService.update(story.id, this._buildData(story, { actived: false })).subscribe(
      res => {
        this._deleteView(story);
      },
      err => {
        console.log(err);
      }
    );
  }

  remove(story) {
    var result = confirm("Are you sure you want to delete this story?");

    if (!result) { return; }

    if (story.status != 'new') {
      return this._archive(story);
    }

    this._delete(story);
  }

  openDialog(story): void {
    if (!!story) {
      this._showDialog(story, this._updateView)
    } else {
      this._showDialog({}, this._appendView);
    }
  }

  _showDialog(data, callback) {
    let myData = Object.assign({}, data, { header: 'New Story' });

    if (!!data.id) {
      myData.header = `Edit ${data.title}`;
    }

    let dialogRef = this.dialog.open(StoryDialogComponent, {
      width: '500px',
      data: myData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        callback(result);
      }
    });
  }

  _updateView = (result) => {
    let index = this.dataSource.findIndex(item => item.id == result.id);
    this.dataSource[index] = result;
    this.dataSource = this.dataSource.slice();
  }

  _appendView = (result) => {
    this.ngOnInit();
  }

  _deleteView = (result)=> {
    this.ngOnInit();
  }

  _archive(story) {
    this.storyService.update(story.id, this._buildData(story, {status: 'archived'})).subscribe(
      res => {
        this._deleteView(story);
      },
      err => {
        console.log(err);
      }
    );
  }

  _delete(story) {
    this.storyService.delete(story.id).subscribe(
      res => {
        this._deleteView(story);
      },
      err => {
        console.log(err);
      }
    );
  }

  _buildData(story, options) {
    const formData: FormData = new FormData();
    let attributes = Object.assign({id: story.id}, options);
    let data = {
      story: attributes
    };

    formData.append("data", JSON.stringify(data));
    return formData;
  }
}
