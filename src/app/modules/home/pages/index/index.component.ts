import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService, IArticle } from '../../../../services/articles.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from "../../../../services/config.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }

  public career$ = this.configService.career$;

  public articleList: IArticle[] = [];

  private subscription: Subscription = null;

  public ngOnInit() {
    this.subscription = this.route.data.subscribe(data => this.articleList = data.articleList);
  }
  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
