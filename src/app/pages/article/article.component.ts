import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { Subscription } from "rxjs";
import { IArticle } from "../../services/articles.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
  ) { }


  private subscriptions: Subscription;

  public article: IArticle = null;

  ngOnInit() {
    this.articlesService.getArticleDetail(this.route.snapshot.paramMap.get('id'));
    this.subscriptions = this.articlesService.$currentArticle.subscribe(v => this.article = v);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
