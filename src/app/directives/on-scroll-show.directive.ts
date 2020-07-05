import { Directive, ElementRef, OnInit, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appOnScrollShow]'
})
export class OnScrollShowDirective implements OnDestroy, OnInit {
  constructor(
    el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) document: Document
  ) {
    this.document = document;
    this.element = el;
  }

  @Output()
  public scrollShow = new EventEmitter();

  private shown = false;

  private document: Document;
  private element: ElementRef<HTMLElement>;

  private subscription: Subscription;

  private lastScrollTop = 0;

  ngOnInit(): void {
    this.subscription = fromEvent(this.document, 'scroll')
      .pipe(
        debounceTime(200)
      )
      .subscribe(() => {
        const offset = this.element.nativeElement.offsetTop;
        const scroll = this.document.documentElement.scrollTop;
        const clientHeight = this.document.documentElement.clientHeight;
        if ((offset <= scroll + clientHeight)) {
          if (!this.shown) {
            this.scrollShow.emit();
          }
          this.shown = true;
        } else {
          this.shown = false;
        }
        this.lastScrollTop = scroll;
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
