import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-motion-background',
  templateUrl: './motion-background.component.html',
  styleUrls: ['./motion-background.component.scss']
})
export class MotionBackgroundComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private configService: ConfigService
  ) { }

  indexBackground = this.configService.indexBackground$;

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
