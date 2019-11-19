import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  private lastPositions = [];

  public savePosition() {
    this.lastPositions.push(this.document.documentElement.scrollTop);
  }

  public scollBack() {
    this.document.documentElement.scrollTo(this.lastPositions.pop() || 0);
  }
}
