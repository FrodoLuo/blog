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

  public articleList$ = new BehaviorSubject<IArticle[]>([]);
  public articleLength$ = new BehaviorSubject<number>(0);

  public currentKeyword$ = new BehaviorSubject<string>('');
  public currentPage$ = new BehaviorSubject<number>(1);

  public getRecentArticles() {
    return this.http.get<IArticle[]>(
      `/api/articles?_sort=updated_at:DESC&_limit=5`
    );
  }

  public setSearch(keyword: string, page: number) {
    this.currentKeyword$.next(keyword);
    this.currentPage$.next(page);
    this.getArticles();
    this.getArticleLength();
  }
  public setKeyword(keyword: string) {
    this.setSearch(keyword, this.currentPage$.getValue());
  }
  public setPage(page: number) {
    this.setSearch(this.currentKeyword$.getValue(), page);
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

  public getArticleLength() {
    this.http.get<number>(
      `/api/articles/count?title_contains=${this.currentKeyword$.getValue()}`
    ).subscribe(res => this.articleLength$.next(res));
  }

  private getArticles() {
    this.http.get<IArticle[]>(
      // tslint:disable-next-line: max-line-length
      `/api/articles?_sort=updated_at:DESC&title_contains=${this.currentKeyword$.getValue()}&_start=${this.currentPage$.getValue() * 10}&_limit=10`
    ).subscribe(res => this.articleList$.next(res));
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
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
  splitedTags: string[];
}
