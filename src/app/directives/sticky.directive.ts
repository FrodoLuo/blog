import {
  Directive,
  ElementRef,
  Inject,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[appSticky]',
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

  private cloned: HTMLElement = null;

  private recover() {
    const origin = this.element.nativeElement;
    document.body.removeChild(this.cloned);
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

    this.cloned = document.body.appendChild(cloned);
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
    this.subscription = fromEvent(this.document, 'scroll')
      .subscribe(this.checkStatus.bind(this))
      .add(fromEvent(window, 'resize').subscribe(this.checkStatus.bind(this)));
  }

  public ngOnDestroy(): void {
    document.body.removeChild(this.cloned);
    this.subscription.unsubscribe();
  }
}
