import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { Subscription } from 'rxjs';
import { IArticle } from '../../services/articles.service';
import { DOCUMENT } from '@angular/common';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  private subscriptions: Subscription;

  public article: IArticle = null;

  ngOnInit() {
    this.subscriptions = this.route.data.subscribe(data => {
      this.article = data.article;
      this.titleService.setTitle(this.article.title);
    });
    if (typeof this.document.documentElement.scrollTo === 'function') {
      this.document.documentElement.scrollTo(0, 0);
    }
  }

  ngOnDestroy() {
    this.titleService.removeSubTitle();
    this.subscriptions.unsubscribe();
  }

}
