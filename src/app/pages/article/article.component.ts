import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { Subscription } from 'rxjs';
import { IArticle } from '../../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
  ) { }


  private subscriptions: Subscription;

  public article: IArticle = null;

  ngOnInit() {
    console.log(this.route.data);

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
