import { Component, OnInit, HostListener, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-motion-background',
  templateUrl: './motion-background.component.html',
  styleUrls: ['./motion-background.component.scss']
})
export class MotionBackgroundComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(DOCUMENT)private document: Document
  ) { }

  indexBackground = 'http://content.frodoluo.ink/uploads/239aac15d7db4d42b6641c9bdd894d3e.jpg';

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
