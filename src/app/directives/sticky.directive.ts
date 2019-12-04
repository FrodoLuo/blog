import { Directive, ElementRef, Inject, OnInit, OnDestroy, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[appSticky]'
})
export class StickyDirective implements OnInit, OnDestroy {

  constructor(
    el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) document: Document
  ) {
    this.element = el;
    this.document = document;
  }

  @Input('appSticky')
  private top = 0;

  private isFixed = false;

  private element: ElementRef<HTMLElement>;
  private document: Document;

  private subscription: Subscription;

  private recover() {
    this.element.nativeElement.style.left = '';
    this.element.nativeElement.style.position = '';
    this.isFixed = false;
  }

  private stick() {
    console.log({e: this.element.nativeElement});
    // this.element.nativeElement.style.left = `${this.element.nativeElement.clientLeft}px`;
    // this.element.nativeElement.style.top = '0';
    // this.element.nativeElement.style.position = 'fixed';
    this.isFixed = true;
  }

  public ngOnInit() {
    this.subscription = fromEvent(this.document, 'scroll').subscribe(
      () => {
        const offset = this.element.nativeElement.offsetTop;
        const scroll = this.document.documentElement.scrollTop;
        if ((offset <= scroll + this.top)) {
          if (!this.isFixed) {
            this.stick();
          }
        } else {
          if (this.isFixed) {
            this.recover();
          }
        }
      }
    );
  }

  public ngOnDestroy() {

  }


}
