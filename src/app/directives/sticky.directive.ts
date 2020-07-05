import { Directive, ElementRef, Inject, OnInit, OnDestroy, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[appSticky]'
})
export class StickyDirective implements OnInit, OnDestroy {

  constructor(
    el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) document: Document,
  ) {
    this.element = el;
    this.document = document;
  }

  @Input('appSticky')
  private top = 0;

  private isFixed = false;

  private element: ElementRef<HTMLElement>;
  private document: Document;
  private savedTop: number | null = 0;
  private subscription: Subscription;

  private recover() {
    this.element.nativeElement.style.left = '';
    this.element.nativeElement.style.top = '';
    this.element.nativeElement.style.position = '';
    this.element.nativeElement.style.marginLeft = '';
    this.element.nativeElement.style.marginTop = '';
    this.isFixed = false;
  }

  private stick() {
    this.savedTop = this.element.nativeElement.offsetTop;
    this.element.nativeElement.style.left = `${this.searchOffset(this.element.nativeElement)}px`;
    this.element.nativeElement.style.top = `${this.top}px`;
    this.element.nativeElement.style.position = 'fixed';
    this.element.nativeElement.style.marginLeft = '0';
    this.element.nativeElement.style.marginTop = '0';
    this.isFixed = true;
  }

  private searchOffset(element: HTMLElement): number {
    return element.offsetParent
      ? element.offsetLeft + this.searchOffset(element.offsetParent as HTMLElement)
      : element.offsetLeft;
  }

  public checkStatus(): void {
    const offset = this.element.nativeElement.offsetTop;
    const scroll = this.document.documentElement.scrollTop;
    if (this.isFixed) {
      if (scroll + this.top <= this.savedTop) {
        this.recover();
      }
    } else {
      if (offset <= scroll + this.top) {
        this.stick();
      }
    }

  }

  public ngOnInit(): void {
    this.savedTop = this.element.nativeElement.offsetTop - this.top;
    this.subscription = fromEvent(this.document, 'scroll').subscribe(this.checkStatus.bind(this))
      .add(fromEvent(this.document, 'resize').subscribe(this.checkStatus.bind(this)));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
