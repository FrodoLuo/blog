import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../../services/articles.service';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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

  public articleList = this.articleService.articleList$;

  public countOfArticles = this.articleService.countOfArticles;

  public keyword$ = new BehaviorSubject<{ value: string, isTag: boolean }>({value: '', isTag: false});

  public ngOnInit(): void {
    this.keyword$.pipe(
      debounceTime(500)
    ).subscribe(input => {
      this.articleService.setKeyword(input.value, input.isTag);
    });
  }

  public setTag(tag: string): void {
    this.keyword$.next({
      value: tag,
      isTag: true
    });
  }

  public setPage(pageIndex: number): void {
    this.articleService.refreshPage(pageIndex);
  }

}
