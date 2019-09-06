import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  private loaded = false;

  public ngOnInit() {
    this.document.addEventListener('load', () => {
      this.loaded = true;
    })
  }

  public showTopBtn() {
    if (!this.loaded) { return false; }
    return this.document.documentElement.scrollTop >= window.innerHeight;
  }

  public scrollTop() {
    this.document.documentElement.scrollTo({
      top: 0
    });
  }
}
