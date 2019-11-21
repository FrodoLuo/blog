import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { ArticleComponent } from './pages/article/article.component';
import { BlogComponent } from './pages/blog/blog.component';
import { MarkdownModule } from 'ngx-markdown';
import { ArticlePageResolver } from 'src/app/router-resolvers/article-page.resolver';


@NgModule({
  declarations: [
    ArticleComponent,
    BlogComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    ArticlePageResolver
  ]
})
export class BlogModule { }