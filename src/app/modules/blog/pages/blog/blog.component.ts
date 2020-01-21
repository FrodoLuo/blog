import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ArticlesService } from '../../../../services/articles.service';
import { Subject } from 'rxjs';
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

  public keyword = new Subject<string>();

  public ngOnInit() {
    this.articleService.setSearch('');
    this.keyword.pipe(
      debounceTime(500)
    ).subscribe(str => this.articleService.setKeyword(str));
  }

  public onShow() {
    this.articleService.getMore();
  }

}
