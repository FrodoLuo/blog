import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {

  constructor(
    private configService: ConfigService,
    private articlesService: ArticlesService,
  ) { }

  public friendLinks$ = this.configService.friendLink$;

  public promote$ = this.configService.promote$;

  ngOnInit() {

  }

  public jumpTo(anchor: string) {
    const a = anchor.toLowerCase().replace(/\s/g, '-').replace(/[\(\),.#]/g, '');
    console.log(a);
    const e = document.getElementById(a);
    const de = document.documentElement;
    de.scrollBy(0, e.offsetTop - de.scrollTop - 80);
  }

}
