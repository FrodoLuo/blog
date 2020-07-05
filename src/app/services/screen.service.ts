import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    window.addEventListener('resize', () => {this.onResize();});
    this.onResize();
  }

  public isVerticalScreen$ = new BehaviorSubject<boolean>(false);

  public onResize(): void {
    const screenWidth = this.document.documentElement.clientWidth;
    const screenHeight = this.document.documentElement.clientHeight;
    this.isVerticalScreen$.next(screenWidth <= screenHeight);
  }

}
