import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { WritePostComponent } from './components/write-post/write-post.component';
import { ArticleComponent } from './components/article/article.component';
import { ReadPostComponent } from './components/read-post/read-post.component';
import { WorkItemComponent } from './components/work/workpage/work-item/work-item.component';
import { SortByEndDatePipe, WorkpageComponent } from './components/work/workpage/workpage.component';

import { NgParticlesModule } from 'ng-particles';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { EditorModule } from '@tinymce/tinymce-angular';

import { WebPostsAPIService } from './services/data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SpeechBubbleComponent } from './components/work/workpage/speech-bubble/speech-bubble.component';

import {AuthModule} from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarLeftComponent,
    MainBodyComponent,
    ArticleComponent,
    SidebarRightComponent,
    WritePostComponent,
    ReadPostComponent,
    WorkItemComponent,
    WorkpageComponent,
    SpeechBubbleComponent,
    SortByEndDatePipe,
    AuthCallbackComponent
  ],
  imports: [
    HttpClientModule,
    AuthModule.forRoot({
      config: {
        authority: environment.auth.authority,
        redirectUrl: environment.auth.redirectUrl,
        postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
        clientId: environment.auth.clientId,
        scope: environment.auth.scope,
        responseType: environment.auth.responseType
      },
    }),
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule,
    FontAwesomeModule,
    FormsModule,
    EditorModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule
],
  providers: [WebPostsAPIService, provideAnimationsAsync('noop'), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
