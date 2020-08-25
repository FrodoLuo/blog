import { Component, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from '@angular/animations';
import { ScreenService } from './services/screen.service';

const globalRoutingAnimation = trigger('globalRoutingAnimation', [
  transition('* <=> *', [
    style({
      position: 'relative',
    }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [
          style({ opacity: 1, display: 'block', overflow: 'hidden', maxHeight: '100vh' }),
          animate('200ms ease', style({ opacity: 0, display: 'none' })),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 0, display: 'block' }),
          animate('400ms 600ms ease', style({ opacity: 1 })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [globalRoutingAnimation],
})
export class AppComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private screenService: ScreenService
  ) { }

  public showTopBtn = false;

  public isVertical = this.screenService.isVerticalScreen$;

  public scrollTop(): void {
    this.document.documentElement.scrollTo({
      top: 0,
    });
  }

  @HostListener('document:scroll')
  public onScroll(): void {

    this.showTopBtn =
        this.document.documentElement.scrollTop >=
        this.document.documentElement.clientHeight;
  }
}
