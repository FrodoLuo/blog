import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService, IArticle } from '../../../../services/articles.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  constructor(
    private articleService: ArticlesService
  ) { }

  public articleList: IArticle[] = [];

  private subscriptions: Subscription = null;

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
