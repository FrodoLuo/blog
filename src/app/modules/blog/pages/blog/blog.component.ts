import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ArticlesService, IArticle } from '../../../../services/articles.service';
import { Subscription } from 'rxjs';

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
  public articleCount = this.articleService.articleLength$;

  public changeKeyword = (() => {
    let timer = null;
    return (keyword: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.articleService.setSearch(keyword, this.currentPage);
      }, 1000);
    };
  })();

  public changePage(page: number) {
    console.log(page);
    this.articleService.setPage(page);
  }
  public ngOnInit() {
    this.articleService.setSearch('', this.currentPage);
  }


}
