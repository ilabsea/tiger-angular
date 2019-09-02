import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SceneService } from '../../services/scene.service';
import { QuestionService } from '../../services/question.service';
import { QuizAnswerDialogComponent } from '../quiz-answer-dialog/quiz-answer-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-story-preview',
  templateUrl: './story-preview.component.html',
  styleUrls: ['./story-preview.component.css'],
})

export class StoryPreviewComponent implements OnInit {
  dataSource: any = [];
  questions: any = [];
  loading = true;
  story_id: string = this.route.snapshot.paramMap.get('id');
  totalSlides = 0;
  story: any = {};
  endpointUrl = environment.endpointUrl;
  audioIcon = 'play_arrow';
  audioSource = '';
  audio = new Audio();

  constructor(
    private route: ActivatedRoute,
    private sceneService: SceneService,
    private questionService: QuestionService,
    private dialog: MatDialog,
    public location: Location
  ) { }

  ngOnInit() {
    this._getScenes();
  }

  _getScenes(): void {
    this.sceneService.getAll(this.story_id)
      .subscribe(res => {
        this.dataSource = res['scenes'];
        this.totalSlides = this.dataSource.length;
        this.story = res['meta']['story'];
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

  showDialog(question: any) {
    if (!!question.message) {
      const myData = Object.assign({}, { question: question });

      this.dialog.open(QuizAnswerDialogComponent, {
        width: '500px',
        data: myData
      });
    }
  }

  slideTo(carousel, link_scene_id) {
    this.audio.pause();
    this.audioIcon = 'play_arrow';

    if (!link_scene_id) {
      carousel.slideTo(this.dataSource.length);
      return;
    }

    const index = this.dataSource.findIndex(scene => scene.id === link_scene_id);

    carousel.slideTo(index);
  }

  slideQuizTo(carousel, index, choice) {
    const next = this.dataSource.length + index;
    this._setAnswer(index - 1, choice);

    this.audio.pause();
    this.audioIcon = 'play_arrow';

    carousel.slideTo(next);
  }

  hanleActionClick(action, carousel) {
    if (JSON.stringify(action.link_scene) === '{}') {
      return this.slideTo(carousel, null);
    }

    if (!!action.link_scene_id) {
      return this.slideTo(carousel, action.link_scene_id);
    }

    this.slideTo(carousel, action.link_scene.id);
  }

  _setAnswer(index, choice) {
    this.questions[index]['user_choice'] = choice;
  }

  togglePlayAudio(audioUrl: string) {
    const audioSource = this.endpointUrl + audioUrl;

    if (this.audioIcon === 'play_arrow') {
      this.audioIcon = 'pause';
      this._playAudio(audioSource);
    } else {
      this.audioIcon = 'play_arrow';
      this.audio.pause();
    }
  }

  _playAudio(audioUrl: string) {
    this.audio.src = audioUrl;
    this.audio.load();
    this.audio.play();
  }

  isCorrectAnswer(id, choices): boolean {
    const arr = this._answers(choices).filter( obj => obj.id === id);

    return !!arr.length;
  }

  getAnswers(choices) {
    const arr = this._answers(choices).map(choice => choice.label);
    return arr.join(' / ');
  }

  private _answers(choices) {
    return choices.filter(obj => !!obj.answered);
  }
}
