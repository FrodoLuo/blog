import { Component, OnInit } from '@angular/core';
import { trigger, transition, group, style, animate, query } from '@angular/animations';

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
      })
    ]),
    group([
      query(':leave', [
        style({ opacity: 1, display: 'block' }),
        animate('400ms ease', style({ opacity: 0, display: 'none' }))
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0, display: 'block' }),
        animate('400ms 400ms ease', style({ opacity: 1 }))
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

  constructor() { }

  ngOnInit() {
  }

}
