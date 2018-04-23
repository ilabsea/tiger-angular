import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { StoryService } from '../../services/story.service';
import { StoryDialogComponent } from '../story-dialog/story-dialog.component';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  displayedColumns = ['name', 'description', 'tags', 'image', 'status', 'actions'];
  dataSource: any=[];
  loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private storyService: StoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getStories();
  }

  getStories(): void {
    this.storyService.getAll()
      .subscribe(result => {
        this.loading = false;
        this.dataSource = result;
        console.log(result);
      });
  }

  publish(story) {
    this.storyService.update(story.id, this._buildData(story, 'published')).subscribe(
      res => {
        this._updateView(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  unpublish(story) {
    this.storyService.update(story.id, this._buildData(story, 'unpublished')).subscribe(
      res => {
        this._updateView(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  clone(story) {
    console.log('clone');
  }

  remove(story) {
    var result = confirm("Are you sure you want to delete this story?");

    if (!result) { return; }

    if (story.status != 'new') {
      return this._archive(story);
    }

    this._delete(story);
  }

  openDialog(scene): void {
    if (!!scene) {
      this._showDialog(scene, this._updateView)
    } else {
      this._showDialog({}, this._appendView);
    }
  }

  _showDialog(data, callback) {
    let dialogRef = this.dialog.open(StoryDialogComponent, {
      width: '500px',
      data: { id: data.id, title: data.title, description: data.description, image: data.image, tags: data.tags }
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
