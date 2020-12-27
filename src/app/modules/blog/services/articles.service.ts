import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IArticle, IArticleRes, IComment } from '../../../models/articles.model';

const PAGE_SIZE = 10;

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private http: HttpClient) { }

  public articleList$ = new BehaviorSubject<IArticle[]>([]);

  public currentKeyword$ = new BehaviorSubject<string>('');

  public countOfArticles$ = new BehaviorSubject<number>(0);

  public getRecentArticles(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(
      '/api/articles?pageSize=5'
    );
  }

  public setKeyword(keyword: string): void {
    this.setSearch(keyword);
  }

  private setSearch(keyword: string) {
    this.articleList$.next([]);
    this.currentKeyword$.next(keyword);
    this.fetchArticles();
  }

  public getArticleDetail(id: number | string): Observable<IArticle> {
    return this.http.get<IArticleRes>(`/api/articles/detail/${id}`).pipe(
      map(this.transformArticleRes),
    );
  }

  public leaveComment(articleId: number, content: string, nick: string, email: string): Observable<IComment> {
    return this.http.post<IComment>('/api/comments', {
      nickname: nick || '无名氏',
      content,
      articleId: articleId,
      permitted: false,
      email
    });
  }

  public refreshPage(pageIndex: number): void {
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

  private fetchArticles(page = 0) {
    this.articleList$.next([]);
    this.http
      .get<IArticleRes[]>(
        // tslint:disable-next-line: max-line-length
        '/api/articles',
        {
          params: {
            page: `${page}`,
            pageSize: `${PAGE_SIZE}`,
            keyword: this.currentKeyword$.getValue()
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
            keyword: this.currentKeyword$.getValue()
          }
        }
      )
      .subscribe(res => this.countOfArticles$.next(res));
  }
}

