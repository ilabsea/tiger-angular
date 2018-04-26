import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TreeModule } from 'angular-tree-component';
import { MatToolbarModule,
         MatMenuModule,
         MatCardModule,
         MatFormFieldModule,
         MatInputModule,
         MatSelectModule,
         MatTableModule,
         MatButtonModule,
         MatIconModule,
         MatSnackBarModule,
         MatPaginatorModule,
         MatDialogModule,
         MatSidenavModule,
         MatProgressSpinnerModule,
         MatChipsModule,
         MatListModule
      } from '@angular/material';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './helpers/token.interceptor';

import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from './app-routing.module';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthorizeService } from './services/authorize.service';
import { StoryService } from './services/story.service';
import { SceneService } from './services/scene.service';
import { SceneActionService } from './services/scene_action.service';
import { SharedEventService } from './services/shared-event.service';

// Dialog
import { SceneActionDialogComponent } from './components/scene-action-dialog/scene-action-dialog.component';
import { StoryDialogComponent } from './components/story-dialog/story-dialog.component';
import { PopupDialogComponent } from './components/popup-dialog/popup-dialog.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SceneFormComponent } from './components/scene-form/scene-form.component';

// Shared
import { NavBarComponent } from './components/navbar/navbar.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { CarouselComponent, CarouselItemElement } from './components/carousel/carousel.component';
import { CarouselItemDirective } from './directives/carousel-item/carousel-item.directive';

// Screens
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryComponent } from './components/story/story.component';
import { ScenesComponent }   from './components/scenes/scenes.component';
import { SceneActionsComponent } from './components/scene-actions/scene-actions.component';
import { StoryPreviewComponent } from './components/story-preview/story-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    UsersComponent,
    UserFormComponent,
    StoriesComponent,
    ScenesComponent,
    SceneFormComponent,
    SceneActionsComponent,
    SceneActionDialogComponent,
    StoryPreviewComponent,
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemElement,
    StoryComponent,
    StoryDialogComponent,
    PopupDialogComponent,
    MenuButtonComponent,

  ],
  imports: [
    NoopAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule,
    TreeModule,
  ],
  entryComponents: [
    SceneFormComponent,
    SceneActionDialogComponent,
    StoryDialogComponent,
    PopupDialogComponent,
    UserFormComponent
  ],
  providers: [
    AuthorizeService,
    StoryService,
    SceneService,
    SceneActionService,
    SharedEventService,
    AuthGuard,
    ApiService,
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
