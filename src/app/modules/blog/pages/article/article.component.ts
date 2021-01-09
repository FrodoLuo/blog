import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';
import { TitleService } from '../../../../services/title.service';
import { IArticle } from 'src/app/models/articles.model';
import { FullscreenImageService } from 'src/app/services/fullscreen-image.service';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  constructor(
    public articlesService: ArticlesService,
    public screenService: ScreenService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private fullImageService: FullscreenImageService
  ) {}

  private subscriptions: Subscription;
  @ViewChild('comment') private commentField: ElementRef<HTMLTextAreaElement>;

  public commentRejected = false;
  public article: IArticle = null;
  public publishing = false;

  public ngOnInit(): void {
    this.subscriptions = this.route.data.subscribe((data) => {
      this.article = data.article;
      this.titleService.setTitle(this.article.title);
    });
  }

  public ngOnDestroy(): void {
    this.titleService.removeSubTitle();
    this.subscriptions.unsubscribe();
  }

  public leaveComment(content: string, nick: string, email: string): void {
    if (content.length == 0) {
      this.commentRejected = true;
      return;
    }
    this.publishing = true;
    this.articlesService
      .leaveComment(this.article.id, content, nick, email)
      .subscribe(() => {
        this.commentRejected = false;
        this.publishing = false;
        this.commentField.nativeElement.value = '';
        this.articlesService
          .getArticleDetail(this.article.id)
          .subscribe((res) => {
            this.article = res;
          });
      });
  }

  public onMarkdownLoad(): void {
    const images = document.documentElement.querySelectorAll('.article img');
    images.forEach((image: HTMLImageElement) => {
      image.addEventListener('click', () => {
        this.fullImageService.showImage$.next(image.src);
      });
    });
  }
}
