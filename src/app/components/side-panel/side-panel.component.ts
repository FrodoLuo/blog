import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ArticlesService } from 'src/app/modules/blog/services/articles.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit, OnDestroy {

  constructor(
    private configService: ConfigService,
    private articleService: ArticlesService,
    private router: Router,
  ) { }

  public flinks$ = this.configService.friendLink$;
  public hotTags$ = this.configService.hotTags$;
  public shouldShowTag = false;
 
  private subscription = new Subscription();

  public ngOnInit(): void {
    this.subscription.add(
      this.onRouteChange(this.router.events)
    );
    this.shouldShowTag = this.router.url.includes('blog');
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public setKeyword(tag: string): void {
    this.articleService.setKeyword(tag);
  }

  private onRouteChange(obs: Observable<RouterEvent>): Subscription {
    return obs
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(
        (data: NavigationEnd) => {
          this.shouldShowTag = data.url.includes('blog');
        }
      );
  }
}
