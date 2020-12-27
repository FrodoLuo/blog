/* eslint-disable @typescript-eslint/ban-types */
import {
  Directive,
  ElementRef,
  Inject,
  OnInit,
  OnDestroy,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[appSticky]',
})
export class StickyDirective implements OnInit, OnDestroy {
  constructor(
    el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.element = el;
    this.document = document;
    this.platformId = platformId;
  }

  @Input('appSticky')
  private top = 0;

  private isFixed = false;

  private element: ElementRef<HTMLElement>;
  private document: Document;
  private platformId: Object;
  private subscription: Subscription = new Subscription();

  private cloned: HTMLElement = null;

  private recover() {
    const origin = this.element.nativeElement;
    if (this.cloned) {
      this.document.body.removeChild(this.cloned);
      this.cloned = null;
    }
    origin.style.opacity = '';
    origin.style.pointerEvents = '';
    this.isFixed = false;
  }

  private stick() {
    const origin = this.element.nativeElement;
    const originBound = origin.getBoundingClientRect();
    const cloned = origin.cloneNode(true) as HTMLElement;
    cloned.style.left = `${originBound.x}px`;
    cloned.style.top = `${this.top}px`;
    cloned.style.position = 'fixed';
    cloned.style.marginLeft = '0';
    cloned.style.marginTop = '0';
    cloned.style.width = `${originBound.width}px`;
    cloned.style.height = `${originBound.height}px`;

    if (this.cloned) {
      this.document.body.removeChild(cloned);
    }
    this.cloned = this.document.body.appendChild(cloned);
    origin.style.opacity = '0';
    origin.style.pointerEvents = 'none';
    this.isFixed = true;
  }

  public checkStatus(): void {
    const offset = this.element.nativeElement.offsetTop;
    const scroll = this.document.documentElement.scrollTop;
    if (this.isFixed) {
      if (scroll + this.top <= offset) {
        this.recover();
      } else if (this.cloned) {
        const bound = this.element.nativeElement.getBoundingClientRect();
        this.cloned.style.left = `${bound.x}px`;
        this.cloned.style.width = `${bound.width}px`;
        this.cloned.style.height = `${bound.height}px`;
      }
    } else {
      if (offset <= scroll + this.top) {
        this.stick();
      }
    }
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.subscription.add(
        fromEvent(this.document, 'scroll')
          .subscribe(this.checkStatus.bind(this))
          .add(
            fromEvent(window, 'resize').subscribe(this.checkStatus.bind(this))
          )
      );
    }
  }

  public ngOnDestroy(): void {
    this.cloned && this.document.body.removeChild(this.cloned);
    this.subscription.unsubscribe();
  }
}
