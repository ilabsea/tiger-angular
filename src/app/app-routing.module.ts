import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScenesComponent } from './components/scenes/scenes.component';
import { SceneActionsComponent } from './components/scene-actions/scene-actions.component';
import { StoryPreviewComponent } from './components/story-preview/story-preview.component';
import { StoryComponent } from './components/story/story.component';

const routes: Routes = [
  { path: '', redirectTo: 'stories', pathMatch: 'full' },
  { path: 'stories', component: StoryComponent },
  { path: 'stories/:id/scenes', component: ScenesComponent },
  { path: 'stories/:id/scenes/:scene_id/scene_actions', component: SceneActionsComponent },
  { path: 'stories/:id/preview', component: StoryPreviewComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
