import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';
import { IndexComponent } from './pages/index/index.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ArticleComponent } from './pages/article/article.component';
import { ArticlePageResolver } from './router-resolvers/article-page.resolver';
import { ArticleListResolver } from './router-resolvers/article-list.resolver';


const routes: Routes = [
  {
    path: '',
    component: IndexLayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
        resolve: {
          articleList: ArticleListResolver
        }
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
      },
      {
        path: ':id',
        component: ArticleComponent,
        resolve: {
          article: ArticlePageResolver
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
