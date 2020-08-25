import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { ArticleComponent } from './pages/article/article.component';
import { BlogComponent } from './pages/blog/blog.component';
import { MarkdownModule } from 'ngx-markdown';
import { ArticlePageResolver } from 'src/app/router-resolvers/article-page.resolver';
import { MaterialModule } from '../material/material.module';
import { CommonDeclarationModule } from '../common-declaration/common-declaration.module';
import { RemoveMarkdownPipe } from '../../pipes/remove-markdown.pipe';
import { CutBriefPipe } from '../../pipes/cut-brief.pipe';
import { ImageEffectsModule } from '../image-effects/image-effects.module';

@NgModule({
  declarations: [
    ArticleComponent,
    BlogComponent,
    RemoveMarkdownPipe,
    CutBriefPipe,
  ],
  imports: [
    BlogRoutingModule,
    CommonDeclarationModule,
    CommonModule,
    ImageEffectsModule,
    MarkdownModule.forRoot(),
    MaterialModule,
  ],
  providers: [ArticlePageResolver],
})
export class BlogModule {}
