import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoryService } from '../../services/story.service';
import { StoryDialogComponent } from '../story-dialog/story-dialog.component';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  displayedColumns = ['name', 'description', 'tags', 'image', 'status', 'actions'];
  dataSource: any=[];
  loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private storyService: StoryService
  ) { }

  ngOnInit() {
    this.getStories();
  }

  getStories(): void {
    this.storyService.getAll()
      .subscribe(result => {
        this.loading = false;
        this.dataSource = result['stories'];
      });
  }

  publish(story) {
    var result = confirm("Are you sure you want to publish this story as you may not be able to modify it anymore?");

    if (!result) { return; }

    this.storyService.update(story.id, this._buildData(story, 'published')).subscribe(
      res => {
        this._updateView(res['story']);
      },
      err => {
        console.log(err);
      }
    );
  }

  unpublish(story) {
    this.storyService.update(story.id, this._buildData(story, 'unpublished')).subscribe(
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
    this.dataSource.push(result);
    this.dataSource = this.dataSource.slice();
  }

  _deleteView = (result)=> {
    this.dataSource.splice(this.dataSource.indexOf(result), 1);
    this.dataSource = this.dataSource.slice();
  }

  _archive(story) {
    this.storyService.update(story.id, this._buildData(story, 'archived')).subscribe(
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

  _buildData(story, status) {
    const formData: FormData = new FormData();

    let data = {
      story: {
        id: story.id,
        status: status
      }
    };

    formData.append("data", JSON.stringify(data));
    return formData;
  }
}
