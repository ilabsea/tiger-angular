import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }      from './components/home/home.component';
import { NavBarComponent }      from './components/navbar/navbar.component';
import { LoginComponent }      from './components/login/login.component';
import { UsersComponent }      from './components/users/users.component';
import { StoriesComponent }      from './components/stories/stories.component';

import { ScenesComponent } from './components/scenes/scenes.component';
import { StoryPreviewComponent } from './components/story-preview/story-preview.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '' , component: NavBarComponent, outlet: 'navbar' },
      { path: 'users' , component: UsersComponent },
      { path: 'stories', component: StoriesComponent },
      { path: 'stories/:id/scenes', component: ScenesComponent },
      { path: 'stories/:id/preview', component: StoryPreviewComponent },
      { path: 'stories/:id/quiz', component: QuestionsComponent },
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  { path: 'confirm_email', component: ConfirmEmailComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
