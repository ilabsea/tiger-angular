import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'app-story-preview',
  templateUrl: './story-preview.component.html',
  styleUrls: ['./story-preview.component.css'],
})

export class StoryPreviewComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  dataSource: any=[];
  loading: boolean = true;
  story_id: string = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private sceneService: SceneService
  ) { }

  ngOnInit() {
    this.getScenes();
  }

  getScenes(): void {
    this.sceneService.getAll(this.story_id)
      .subscribe(scenes => {
        this.loading = false;
        this.dataSource = scenes;
      });
  }

  slideTo(carousel, link_scene_id) {
    let index = this.dataSource.findIndex(scene => scene.id == link_scene_id);
    carousel.slideTo(index);
  }
}
