import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';
import { IndexComponent } from './pages/index/index.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { BlogComponent } from './pages/blog/blog.component';


const routes: Routes = [
  {
    path: '',
    component: IndexLayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      }
    ]
  },
  {
    path: 'blog',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        component: BlogComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
