import { BrowserModule } from '@angular/platform-browser';
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

import { SceneService } from './services/scene.service';
import { SceneActionService } from './services/scene_action.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ScenesComponent }   from './components/scenes/scenes.component';
import { SceneFormComponent } from './components/scene-form/scene-form.component';
import { SceneActionsComponent } from './components/scene-actions/scene-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    ScenesComponent,
    SceneFormComponent,
    SceneActionsComponent
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
    AppRoutingModule,
    HttpClientModule,
  ],
  entryComponents: [SceneFormComponent],
  providers: [
    SceneService,
    SceneActionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
