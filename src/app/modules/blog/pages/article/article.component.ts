import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArticle, ArticlesService } from '../../../../services/articles.service';
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
  ) { }

  private subscriptions: Subscription;
  @ViewChild('comment', {
    static: false
  }) private commentField: ElementRef<HTMLTextAreaElement>

  public commentRejected = false;
  public article: IArticle = null;
  public indexes: Array<{ title: string; tab: number }> = [];
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
  }

  ngOnDestroy() {
    this.titleService.removeSubTitle();
    this.articlesService.cleanIndexes();
    this.subscriptions.unsubscribe();
  }

  leaveComment(content: string, nick: string) {
    if (content.length == 0) {
      this.commentRejected = true;
      return;
    }
    this.publishing = true;
    this.articlesService.leaveComment(this.article.id, content, nick)
      .subscribe(res => {
        console.log(res);
        this.commentRejected = false;
        this.publishing = false;
        this.commentField.nativeElement.value = '';
        console.log(this.commentField)
        this.articlesService.getArticleDetail(this.article.id)
          .subscribe(res => {
            this.article = res;
          })
      })

  }

}
