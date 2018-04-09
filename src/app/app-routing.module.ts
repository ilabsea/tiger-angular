import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScenesComponent }   from './components/scenes/scenes.component';


const routes: Routes = [
  { path: '', redirectTo: '/scenes', pathMatch: 'full' },
  { path: 'scenes', component: ScenesComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
