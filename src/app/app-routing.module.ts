import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WritePostComponent } from './components/write-post/write-post.component';
import { ReadPostComponent } from './components/read-post/read-post.component';

const routes: Routes = [
  {path: 'blog', component: ReadPostComponent},
  {path: 'publish', component: WritePostComponent},
  {path: '', redirectTo:'/blog',pathMatch:'full'} //Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
