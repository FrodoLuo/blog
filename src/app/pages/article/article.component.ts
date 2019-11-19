import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { Subscription } from 'rxjs';
import { IArticle } from '../../services/articles.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) { }

  private subscriptions: Subscription;

  public article: IArticle = null;

  ngOnInit() {
    this.subscriptions = this.route.data.subscribe(data => this.article = data.article);
    if (this.document.documentElement.scrollTo) {
      this.document.documentElement.scrollTo(0, 0);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
