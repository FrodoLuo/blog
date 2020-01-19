import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const PAGE_SIZE = 10;

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  public articleList$ = new BehaviorSubject<IArticle[]>([]);

  public currentKeyword$ = new BehaviorSubject<string>('');

  public indexes$ = new BehaviorSubject<Index[] | null>(null);

  public getRecentArticles() {
    return this.http.get<IArticle[]>(
      `/api/articles?_sort=updated_at:DESC&_limit=5`
    );
  }

  public setSearch(keyword: string) {
    this.currentKeyword$.next(keyword);
    this.getArticles();
  }
  public setKeyword(keyword: string) {
    this.articleList$.next([]);
    this.setSearch(keyword);
  }
  public getMore() {
    this.getArticles();
  }
  public getArticleDetail(id: number | string) {
    return this.http.get<IArticleRes>(`/api/articles/${id}`).pipe(
      map(this.transformArticleRes),
      tap(data => {
        this.setIndexes(data.content);
      })
    );
  }

  private setIndexes(content: string) {
    const indexes = content
      .split(/\n/)
      .filter(str => str.match(/^#+\s.*$/))
      .filter(str => str.split(/\s/)[0].length < 5)
      .map(str => {
        const [c, ...h] = str.split(/\s/);
        return {
          title: h.join(' '),
          indent: Number(c.length)
        };
      });
    this.indexes$.next(indexes);
  }

  public cleanIndexes() {
    this.indexes$.next(null);
  }

  public leaveComment(articleId: number, content: string, nick: string) {
    return this.http.post<IComment>('/api/comments', {
      nickname: nick || '无名氏',
      content,
      article: articleId,
      permitted: false
    });
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
  private getArticles() {
    this.http
      .get<IArticleRes[]>(
        // tslint:disable-next-line: max-line-length
        `/api/articles?_sort=updated_at:DESC&title_contains=${this.currentKeyword$.getValue()}&_start=${
          this.articleList$.getValue().length
        }&_limit=${PAGE_SIZE}`
      )
      .pipe(map(articles => articles.map(this.transformArticleRes)))
      .subscribe(res => {
        console.log(res);
        this.articleList$.next(this.articleList$.getValue().concat(res));
      });
  }
}

export interface IComment {
  id: number;
  content: string;
  nickname: string;
  created_at: number;
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
  comments: IComment[];
  cover: string;
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
  comments: IComment[];
  cover: string;
}

export interface Index {
  title: string;
  indent: number;
}
