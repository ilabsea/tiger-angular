import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'app-story-preview',
  templateUrl: './story-preview.component.html',
  styleUrls: ['./story-preview.component.css'],
})

export class StoryPreviewComponent implements OnInit {
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
      .subscribe(res => {
        this.loading = false;
        this.dataSource = res['scenes'];
      });
  }

  slideTo(carousel, link_scene_id) {
    let index = this.dataSource.findIndex(scene => scene.id == link_scene_id);
    carousel.slideTo(index);
  }
}
