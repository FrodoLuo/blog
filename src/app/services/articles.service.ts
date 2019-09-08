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

  public async getArticles(start: number = 0, num: number = 0) {
    this.http.get<IArticle[]>(
      '/api/articles'
    )
      .subscribe(res => {
        this.$articles.next(res);
      });
  }
}

export interface IArticle {
  title: string;
  content: string;
}
