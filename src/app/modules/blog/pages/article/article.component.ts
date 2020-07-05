import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesService } from '../../../../services/articles.service';
import { TitleService } from '../../../../services/title.service';
import { IArticle } from 'src/app/services/models/articles.model';

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
  }) private commentField: ElementRef<HTMLTextAreaElement>;

  public commentRejected = false;
  public article: IArticle = null;
  public publishing = false;

  ngOnInit(): void {
    this.subscriptions = this.route.data.subscribe(data => {
      this.article = data.article;
      this.titleService.setTitle(this.article.title);
    });
  }

  ngOnDestroy(): void {
    this.titleService.removeSubTitle();
    this.subscriptions.unsubscribe();
  }

  leaveComment(content: string, nick: string): void {
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
        console.log(this.commentField);
        this.articlesService.getArticleDetail(this.article.id)
          .subscribe(res => {
            this.article = res;
          });
      });

  }

}
