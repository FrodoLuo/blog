import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService, IArticle } from '../../services/articles.service';
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
    this.subscriptions = this.articleService.$articles.subscribe(list => this.articleList = list);
    this.articleService.getArticles();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
