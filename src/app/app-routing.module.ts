import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WritePostComponent } from './components/write-post/write-post.component';
import { ReadPostComponent } from './components/read-post/read-post.component';
import { WorkItemComponent } from './components/work/workpage/work-item/work-item.component';
import { WorkpageComponent } from './components/work/workpage/workpage.component';
import { LoginComponent } from './components/login/login.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

const routes: Routes = [
  {path: 'blog', component: ReadPostComponent},
  {path: 'publish', component: WritePostComponent},
  {path: 'work', component: WorkpageComponent},
  {path: 'userData', component: LoginComponent},
  {path: 'auth/callback', component: AuthCallbackComponent},
  {path: 'auth/logout', redirectTo:'/blog', pathMatch:'full'},
  {path: '', redirectTo:'/blog',pathMatch:'full'} //Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
