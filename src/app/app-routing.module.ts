import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./modules/blog/blog.module').then(mod => mod.BlogModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
