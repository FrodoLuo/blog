import { Component, OnInit, Inject } from '@angular/core';
import { trigger, transition, group, style, animate, query } from '@angular/animations';
import { ConfigService } from '../../services/config.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { ArticlesService } from '../../services/articles.service';
import { EventService, EVENTS } from "../../services/event.service";

type IMenuConfig = Array<{
  path: string;
  icon: string;
  name: string;
}>;

const routerAnimation = trigger('routerAnimation', [
  transition('* <=> *', [
    style({
      position: 'relative'
    }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    group([
      query(':leave', [
        style({ opacity: 1, display: 'block' }),
        animate('200ms ease', style({ opacity: 0, display: 'none' }))
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0, display: 'block' }),
        animate('400ms 600ms ease', style({ opacity: 1 }))
      ])
    ])
  ])
]);

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [routerAnimation]
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private configService: ConfigService,
    private articlesService: ArticlesService,
    private eventService: EventService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationEnd) {
        if (typeof this.document.documentElement.scrollTo === 'function') {
          setTimeout(() => {
            this.document.documentElement.scrollTo(0, 0);
          }, 400);
        }
      }
    });

    this.eventService.subscribe(EVENTS.SET_FULLSCREEN, (flag) => {
      this.fullScreen = flag;
    });

  }

  public menuConfigs: IMenuConfig = [
    {
      path: '/',
      name: 'Home',
      icon: 'home'
    },
    {
      path: '/blog',
      name: 'Blog',
      icon: 'collections_bookmark'
    },
    {
      path: '/album',
      name: 'Album',
      icon: 'photo_album'
    }
  ];

  public background = this.configService.indexBackground$;

  public toggle = this.router.url !== '/';

  public sideOpen = false;

  public hasHistory = false;

  public indexes$ = this.articlesService.indexes$;

  public fullScreen = false;

  public goBack() {
    const pathes = this.router.url.split(/[\/\\]/);
    pathes.splice(pathes.length - 1, 1);
    this.router.navigateByUrl(pathes.join('/'));
  }

  ngOnInit() {
    this.router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationEnd) {
        this.hasHistory = e.url !== '/';
        this.toggle = e.url !== '/';
      }
    });
  }

  public jumpTo(anchor: string) {
    const a = anchor.toLowerCase().replace(/\s/g, '-').replace(/[\(\),.#]/g, '');
    console.log(a);
    const e = document.getElementById(a);
    if (!e) {
      return;
    }
    const de = document.documentElement;
    de.scrollBy(0, e.offsetTop - de.scrollTop - 80);
  }

}
