import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { MainBodyComponent } from './components/main-body/main-body.component';

import { NgParticlesModule } from 'ng-particles';

@NgModule({
  declarations: [
    AppComponent,
    SidebarLeftComponent,
    MainBodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
