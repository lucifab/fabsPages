import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { WritePostComponent } from './components/write-post/write-post.component';
import { ArticleComponent } from './components/article/article.component';

import { NgParticlesModule } from 'ng-particles';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EditorModule } from '@tinymce/tinymce-angular';

import { WebPostsAPIService } from './services/data-service.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    SidebarLeftComponent,
    MainBodyComponent,
    ArticleComponent,
    SidebarRightComponent,
    WritePostComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule,
    FontAwesomeModule,
    FormsModule,
    EditorModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
],
  providers: [WebPostsAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
