import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WritePostComponent } from './components/write-post/write-post.component';
import { ReadPostComponent } from './components/read-post/read-post.component';
import { WorkItemComponent } from './components/work/workpage/work-item/work-item.component';
import { WorkpageComponent } from './components/work/workpage/workpage.component';

const routes: Routes = [
  {path: 'blog', component: ReadPostComponent},
  {path: 'publish', component: WritePostComponent},
  {path: 'work', component: WorkpageComponent},
  {path: '', redirectTo:'/blog',pathMatch:'full'} //Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
