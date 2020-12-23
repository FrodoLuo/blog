import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ArticlesService } from '../modules/blog/services/articles.service';
import { Observable } from 'rxjs';
import { IArticle } from '../models/articles.model';

@Injectable()
export class ArticlePageResolver implements Resolve<IArticle> {
  constructor(
    private articlesService: ArticlesService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IArticle | Observable<IArticle> | Promise<IArticle> {
    return this.articlesService.getArticleDetail(route.paramMap.get('id'));
  }


}
