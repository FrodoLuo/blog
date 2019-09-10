import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private http: HttpClient,
  ) { }

  public $articles = new BehaviorSubject<IArticle[]>([]);

  public $currentArticle = new BehaviorSubject<IArticle>(null);

  public async getArticles(start: number = 0, num: number = 0) {
    this.http.get<IArticle[]>(
      '/api/articles'
    )
      .subscribe(res => {
        this.$articles.next(res);
      });
  }

  public async getArticleDetail(id: number | string) {
    this.$currentArticle.next(null);
    this.http.get<IArticleRes>(
      `/api/articles/${id}`
    ).pipe(
      map(res => {
        const r = { ...res };
        (r as any).tags = (res.tags || '').split(',');
        return r as any;
      })
    )
      .subscribe((res: IArticle) => {
        this.$currentArticle.next(res);
      });
  }
}

export interface IArticleRes {
  id: number;
  title: string;
  content: string;
  brief: string;
  author: {
    id: number;
    username: string;
  };
  created_at: number;
  tags: string;
}
export interface IArticle {
  id: number;
  title: string;
  content: string;
  brief: string;
  author: {
    id: number;
    username: string;
  };
  created_at: number;
  tags: string[];
}
