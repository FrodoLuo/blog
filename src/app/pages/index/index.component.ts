import { Component, OnInit, OnDestroy } from "@angular/core";
import { ArticlesService, IArticle } from "../../services/articles.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  constructor(
    private articlesService: ArticlesService,
  ) { }

  private subscriptions: Subscription;

  public articleList: IArticle[];

  public ngOnInit() {
    this.subscriptions = this.articlesService.$articles.subscribe(value => this.articleList = value);
    this.articlesService.getArticles();
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
