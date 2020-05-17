import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { AlbumLayoutComponent } from './layout/album-layout/album-layout.component';

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/home/home.module").then((mod) => mod.HomeModule),
      },
      {
        path: "blog",
        loadChildren: () =>
          import("./modules/blog/blog.module").then((mod) => mod.BlogModule),
      },
    ],
  },
  {
    path: "album",
    component: AlbumLayoutComponent,
    loadChildren: () =>
      import("./modules/album/album.module").then((mod) => mod.AlbumModule),
    data: {
      animtaion: 'album'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: "enabled",
      scrollPositionRestoration: "disabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
