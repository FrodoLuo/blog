import { Directive, HostListener, ElementRef, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appOnScrollShow]'
})
export class OnScrollShowDirective implements OnDestroy {

  constructor(
    el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document
  ) {
    el.nativeElement.classList.add('lazy-fading');
    this.handler = () => { this.handleScroll(el); };
    this.document.addEventListener('scroll', this.handler);
  }

  private handler = null;

  public ngOnDestroy() {
    this.document.removeEventListener('scroll', this.handler);
  }

  public handleScroll(ele: ElementRef<HTMLElement>) {
    const offset = ele.nativeElement.offsetTop - this.document.documentElement.scrollTop;
    if (offset <= this.document.documentElement.clientHeight * 0.7) {
      ele.nativeElement.classList.add('show');
    }
  }

}
