import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule } from 'ng2-dragula';
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
         MatListModule,
         MatRadioModule,
         MatExpansionModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatSlideToggleModule,
         MatCheckboxModule,
      } from '@angular/material';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './helpers/token.interceptor';

import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from './app-routing.module';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { StoryService } from './services/story.service';
import { SceneService } from './services/scene.service';
import { SharedEventService } from './services/shared-event.service';
import { QuestionService } from './services/question.service';
import { ChartService } from './services/chart.service';
import { TagService } from './services/tag.service';
import { NotificationTemplateService } from './services/notification-template.service';

// Dialog
import { StoryDialogComponent } from './components/story-dialog/story-dialog.component';
import { PopupDialogComponent } from './components/popup-dialog/popup-dialog.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SceneFormComponent } from './components/scene-form/scene-form.component';
import { SceneActionsDialogComponent } from './components/scene-actions-dialog/scene-actions-dialog.component';
import { CustomDateRangeDialogComponent } from './components/custom-date-range-dialog/custom-date-range-dialog.component';
import { QuizAnswerDialogComponent } from './components/quiz-answer-dialog/quiz-answer-dialog.component';

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
import { ScenesComponent }   from './components/scenes/scenes.component';
import { StoryPreviewComponent } from './components/story-preview/story-preview.component';
import { DeactivateDialogComponent } from './components/deactivate-dialog/deactivate-dialog.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RejectDialogComponent } from './components/reject-dialog/reject-dialog.component';
import { SignupDialogComponent } from './components/signup-dialog/signup-dialog.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { FooterComponent } from './components/footer/footer.component';

import { NotificationTemplateComponent } from './components/notification-template/notification-template.component';
import { NotificationTemplateFormComponent } from './components/notification-template-form/notification-template-form.component';
import { NotificationSettingDialogComponent } from './components/notification-setting-dialog/notification-setting-dialog.component';

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
    StoryPreviewComponent,
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemElement,
    StoryDialogComponent,
    PopupDialogComponent,
    MenuButtonComponent,
    DeactivateDialogComponent,
    QuestionsComponent,
    QuestionDialogComponent,
    SceneActionsDialogComponent,
    DashboardComponent,
    CustomDateRangeDialogComponent,
    QuizAnswerDialogComponent,
    RejectDialogComponent,
    SignupDialogComponent,
    ConfirmEmailComponent,
    FooterComponent,
    NotificationTemplateComponent,
    NotificationTemplateFormComponent,
    NotificationSettingDialogComponent,
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
    MatRadioModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    AppRoutingModule,
    HttpClientModule,
    DragulaModule,
    ChartsModule,
  ],
  entryComponents: [
    SceneFormComponent,
    StoryDialogComponent,
    PopupDialogComponent,
    UserFormComponent,
    DeactivateDialogComponent,
    QuestionDialogComponent,
    SceneActionsDialogComponent,
    CustomDateRangeDialogComponent,
    QuizAnswerDialogComponent,
    RejectDialogComponent,
    SignupDialogComponent,
    NotificationTemplateFormComponent,
    NotificationSettingDialogComponent,
  ],
  providers: [
    StoryService,
    SceneService,
    SharedEventService,
    AuthGuard,
    ApiService,
    AuthService,
    UserService,
    QuestionService,
    ChartService,
    TagService,
    NotificationTemplateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
