import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { IndexLayoutComponent } from './components/index-layout/index-layout.component';
import { ArticleListResolver } from 'src/app/router-resolvers/article-list.resolver';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    resolve: {
      articleList: ArticleListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
