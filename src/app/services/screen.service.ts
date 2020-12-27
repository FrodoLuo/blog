/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export enum ScreenSize {
  extraSmall = 0,
  small = 1,
  middle = 2,
  full = 3,
}

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    if (isPlatformBrowser(platformId)) {
      window.addEventListener('resize', () => {
        this.onResize();
      });
    }
  }

  public isVerticalScreen$ = new BehaviorSubject<boolean>(false);
  public currentScreenSize$ = new BehaviorSubject<ScreenSize>(ScreenSize.full);

  public onResize(): void {
    const screenWidth = this.document.documentElement.clientWidth;
    const screenHeight = this.document.documentElement.clientHeight;
    this.isVerticalScreen$.next(screenWidth <= screenHeight);

    if (screenWidth >= 904) {
      this.currentScreenSize$.next(ScreenSize.full);
    } else if (screenWidth >= 684) {
      this.currentScreenSize$.next(ScreenSize.middle);
    } else if (screenWidth >= 480) {
      this.currentScreenSize$.next(ScreenSize.small);
    } else {
      this.currentScreenSize$.next(ScreenSize.extraSmall);
    }
    console.log(this.currentScreenSize$.getValue());
  }
}
