import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './pages/article/article.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ArticlePageResolver } from 'src/app/router-resolvers/article-page.resolver';


const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
  {
    path: 'blog/:id',
    component: ArticleComponent,
    resolve: {
      article: ArticlePageResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
