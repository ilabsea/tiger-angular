import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { TreeModule } from 'angular-tree-component';

import { SceneService } from './services/scene.service';
import { SceneActionService } from './services/scene_action.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ScenesComponent }   from './components/scenes/scenes.component';
import { SceneFormComponent } from './components/scene-form/scene-form.component';
import { SceneActionsComponent } from './components/scene-actions/scene-actions.component';
import { SceneActionDialogComponent } from './components/scene-action-dialog/scene-action-dialog.component';
import { StoryPreviewComponent } from './components/story-preview/story-preview.component';

import { CarouselComponent, CarouselItemElement } from './components/carousel/carousel.component';
import { CarouselItemDirective } from './directives/carousel-item/carousel-item.directive';

@NgModule({
  declarations: [
    AppComponent,
    ScenesComponent,
    SceneFormComponent,
    SceneActionsComponent,
    SceneActionDialogComponent,
    StoryPreviewComponent,
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemElement
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatMenuModule,
    BrowserAnimationsModule,
    TreeModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  entryComponents: [
    SceneFormComponent,
    SceneActionDialogComponent,
  ],
  providers: [
    SceneService,
    SceneActionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
