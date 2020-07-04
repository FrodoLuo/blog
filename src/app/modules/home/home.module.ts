import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ArticleListResolver } from 'src/app/router-resolvers/article-list.resolver';
import { MotionBackgroundComponent } from './components/motion-background/motion-background.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    IndexComponent,
    MotionBackgroundComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  providers: [
    ArticleListResolver
  ]
})
export class HomeModule { }
