import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, query, group, animate } from '@angular/animations';


const globalRoutingAnimation = trigger(
  'globalRoutingAnimation', [
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
  ]
)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [globalRoutingAnimation]
})
export class AppComponent {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    document.addEventListener('scroll', () => {
      this.showTopBtn = this.document.documentElement.scrollTop >= this.document.documentElement.clientHeight;
    });
  }

  public showTopBtn = false;

  public scrollTop() {
    this.document.documentElement.scrollTo({
      top: 0
    });
  }
}
