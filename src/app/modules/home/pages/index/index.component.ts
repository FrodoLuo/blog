import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../services/config.service';
import { IArticle } from 'src/app/services/models/articles.model';

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

  public ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => this.articleList = data.articleList);
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
