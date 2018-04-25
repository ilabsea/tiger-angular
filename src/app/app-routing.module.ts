import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScenesComponent }   from './components/scenes/scenes.component';
import { SceneActionsComponent }   from './components/scene-actions/scene-actions.component';

const routes: Routes = [
  { path: '', redirectTo: 'stories/1/scenes', pathMatch: 'full' },
  { path: 'stories/:id/scenes', component: ScenesComponent },
  { path: 'scenes/:scene_id/scene_actions', component: SceneActionsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
