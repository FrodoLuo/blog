import { Component, OnInit, HostListener, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-motion-background',
  templateUrl: './motion-background.component.html',
  styleUrls: ['./motion-background.component.scss']
})
export class MotionBackgroundComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  indexBackground = 'https://www.frodoluo.ink/api/uploads/36420757cee24c5b91e61b15a7f6eabc.jpg';

  fromTop = 0;

  ngOnInit() {
    this.document.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy() {
    this.document.removeEventListener('scroll', this.handleScroll);
  }

  public handleScroll = () => {
    const ratio = this.document.documentElement.scrollTop;
    this.fromTop = ratio * -0.1;
  }
}
