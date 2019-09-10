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
  public getRecentArticles(start: number = 0, num: number = 0) {
    return this.http.get<IArticle[]>(
      '/api/articles'
    );
  }

  public getArticleDetail(id: number | string) {
    return this.http.get<IArticleRes>(
      `/api/articles/${id}`
    ).pipe(
      map(res => {
        const r: IArticle = { ...res, splitedTags: (res.tags || '').split(',') };
        return r;
      })
    );
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
  splitedTags: string[];
}
