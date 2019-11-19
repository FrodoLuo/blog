import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IArticle, ArticlesService } from '../services/articles.service';


@Injectable()
export class ArticleListResolver implements Resolve<IArticle[]> {

  constructor(
    private articlesService: ArticlesService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IArticle[] | import('rxjs').Observable<IArticle[]> | Promise<IArticle[]> {
    console.log('retch list resolver')
    return this.articlesService.getRecentArticles();
  }

}
