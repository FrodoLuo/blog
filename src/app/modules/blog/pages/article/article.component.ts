import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArticle, ArticlesService } from '../../../../services/articles.service';
import { DOCUMENT } from '@angular/common';
import { TitleService } from '../../../../services/title.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    private articlesService: ArticlesService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  private subscriptions: Subscription;

  public commentRejected = false;
  public article: IArticle = null;
  public indexes: Array<{title: string; tab: number}> = [];
  public publishing = false;

  ngOnInit() {
    this.subscriptions = this.route.data.subscribe(data => {
      this.article = data.article;
      this.titleService.setTitle(this.article.title);
      const indexesTitles = this.article.content.match(/^#{1,2}\s.*$/mg) || [];
      this.indexes = indexesTitles.map(i => {
        const tabStr = i.match(/#+/);
        const titleStr = i.match(/#+\s(.*)/)[1] || null;
        return {
          title: titleStr,
          tab: tabStr[0].length
        };
      });
    });
    if (typeof this.document.documentElement.scrollTo === 'function') {
      this.document.documentElement.scrollTo(0, 0);
    }
  }

  ngOnDestroy() {
    this.titleService.removeSubTitle();
    this.articlesService.cleanIndexes();
    this.subscriptions.unsubscribe();
  }

  leaveComment(content: string, nick: string) {
    this.publishing = true;
    this.articlesService.leaveComment(this.article.id, content, nick)
      .subscribe(res => {
        console.log(res);
        this.publishing = false;
      })

  }
  
}
