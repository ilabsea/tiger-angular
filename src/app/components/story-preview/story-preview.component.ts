import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SceneService } from '../../services/scene.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-story-preview',
  templateUrl: './story-preview.component.html',
  styleUrls: ['./story-preview.component.css'],
})

export class StoryPreviewComponent implements OnInit {
  dataSource: any=[];
  questions: any = [];
  loading: boolean = true;
  story_id: string = this.route.snapshot.paramMap.get('id');
  totalSlides: number = 0;

  constructor(
    private route: ActivatedRoute,
    private sceneService: SceneService,
    private questionService: QuestionService,

  ) { }

  ngOnInit() {
    this._getScenes();
  }

  _getScenes(): void {
    this.sceneService.getAll(this.story_id)
      .subscribe(res => {
        this.dataSource = res['scenes'];
        this.totalSlides = this.dataSource.length;
        this._getQuizzes();
      });
  }

  _getQuizzes() {
    this.questionService.getAll(this.story_id)
      .subscribe(res => {
        this.loading = false;
        this.questions = res['questions'];
        this.totalSlides += this.questions.length;
      });
  }

  slideTo(carousel, link_scene_id) {
    if (!link_scene_id) {
      carousel.slideTo(this.dataSource.length);
      return;
    }

    let index = this.dataSource.findIndex(scene => scene.id == link_scene_id);
    carousel.slideTo(index);
  }

  slideQuizTo(carousel, index) {
    let next = this.dataSource.length + index
    if ( next == this.totalSlides) {
      return alert('Show answer');
    }

    carousel.slideTo(next);
  }
}
