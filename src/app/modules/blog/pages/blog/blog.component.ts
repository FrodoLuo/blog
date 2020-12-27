import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private articleService: ArticlesService
  ) { }

  public currentPage = 0;

  public articleList$ = this.articleService.articleList$;
  public articleListGroup$ = [
    this.articleService.articleList$.pipe(map(v => v.filter((_, i) => i % 2 === 0))),
    this.articleService.articleList$.pipe(map(v => v.filter((_, i) => i % 2 === 1))),
  ];
  public keyword$ = this.articleService.currentKeyword$
  public inputChange$ = new Subject<string>();

  public countOfArticles$ = this.articleService.countOfArticles$;



  public ngOnInit(): void {
    this.articleService.refreshPage(0);
    this.inputChange$.pipe(
      debounceTime(500)
    ).subscribe(input => {
      this.articleService.setKeyword(input);
    });
  }

  public setPage(pageIndex: number): void {
    this.articleService.refreshPage(pageIndex);
  }

}
