import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScenesComponent }   from './components/scenes/scenes.component';


const routes: Routes = [
  { path: '', redirectTo: 'stories/1/scenes', pathMatch: 'full' },
  { path: 'stories/:id/scenes', component: ScenesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
