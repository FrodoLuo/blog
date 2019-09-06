import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {

  constructor() { }

  public ngOnInit() {
  }

  public showTopBtn() {
    return window.document.documentElement.scrollTop >= window.innerHeight;
  }

  public scrollTop() {
    window.document.documentElement.scrollTo({
      top: 0
    });
  }
}
