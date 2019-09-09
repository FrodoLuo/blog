import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ink-client';

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  public showTopBtn() {
    return this.document.documentElement.scrollTop >= this.document.documentElement.clientHeight;
  }

  public scrollTop() {
    this.document.documentElement.scrollTo({
      top: 0
    });
  }
}
