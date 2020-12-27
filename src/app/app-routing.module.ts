import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'blog',
        pathMatch: 'prefix',
      },
      {
        path: 'blog',
        loadChildren: () => import('./modules/blog/blog.module').then((mod) => mod.BlogModule),
      },
      {
        path: 'album',
        loadChildren: () => import('./modules/album/album.module').then((mod) => mod.AlbumModule),
        data: {
          animtaion: 'album'
        }
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'disabled',
      initialNavigation: 'enabled'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
