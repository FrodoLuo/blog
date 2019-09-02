import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-motion-background',
  templateUrl: './motion-background.component.html',
  styleUrls: ['./motion-background.component.scss']
})
export class MotionBackgroundComponent implements OnInit, OnDestroy {

  constructor() { }

  indexBackground = 'http://content.frodoluo.ink/uploads/239aac15d7db4d42b6641c9bdd894d3e.jpg';

  fromTop = 0;

  ngOnInit() {
    document.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  public handleScroll = () => {
    const ratio = document.documentElement.scrollTop;
    this.fromTop = ratio * -0.1;
  }
}
