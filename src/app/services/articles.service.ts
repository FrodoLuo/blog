import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IArticle, IArticleRes, IComment } from './models/articles.model';

const PAGE_SIZE = 10;

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private http: HttpClient) { }

  public articleList$ = new BehaviorSubject<IArticle[]>([]);

  public currentKeyword$ = new BehaviorSubject<string>('');

  public countOfArticles = new BehaviorSubject<number>(0);

  private useTag = false;

  public getRecentArticles() {
    return this.http.get<IArticle[]>(
      `/api/articles?_sort=updated_at:DESC&_limit=5`
    );
  }

  public setKeyword(keyword: string, useTag: boolean) {
    this.useTag = useTag;
    this.setSearch(keyword);
  }

  private setSearch(keyword: string) {
    this.articleList$.next([]);
    this.currentKeyword$.next(keyword);
    this.fetchArticles();
  }

  public getArticleDetail(id: number | string) {
    return this.http.get<IArticleRes>(`/api/articles/${id}`).pipe(
      map(this.transformArticleRes),
    );
  }

  public leaveComment(articleId: number, content: string, nick: string) {
    return this.http.post<IComment>('/api/comments', {
      nickname: nick || '无名氏',
      content,
      article: articleId,
      permitted: false
    });
  }

  public refreshPage(pageIndex: number) {
    this.fetchArticles(pageIndex);
  }

  private transformArticleRes(articleRes: IArticleRes): IArticle {
    const a = {
      ...articleRes,
      splitedTags: (articleRes.tags || '')
        .split(/[\s,]/)
        .filter(str => str.length > 0)
    };
    a.comments.sort((a, b) => b.id - a.id);
    return a;
  }

  private fetchArticles(page: number = 0) {
    this.articleList$.next([]);
    this.http
      .get<IArticleRes[]>(
        // tslint:disable-next-line: max-line-length
        '/api/articles',
        {
          params: {
            _sort: 'updated_at:DESC',
            _start: `${page * PAGE_SIZE}`,
            _limit: `${PAGE_SIZE}`,
            ...this.useTag
              ? { tags_contains: [this.currentKeyword$.getValue()] }
              : { title_contains: [this.currentKeyword$.getValue()] },
          }
        }
      )
      .pipe(map(articles => articles.map(this.transformArticleRes)))
      .subscribe(res => {
        this.articleList$.next(res);
      });
    this.http
      .get<number>(
        '/api/articles/count',
        {
          params: {
            ...this.useTag
            ? { tags_contains: [this.currentKeyword$.getValue()] }
            : { title_contains: [this.currentKeyword$.getValue()] },
          }
        }
      )
      .subscribe(res => this.countOfArticles.next(res));
  }
}

