import { Component, OnInit } from '@angular/core';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-album-layout',
  templateUrl: './album-layout.component.html',
  styleUrls: ['./album-layout.component.scss']
})
export class AlbumLayoutComponent implements OnInit {

  constructor(
    private screenService: ScreenService
  ) { }

  public isVerticalScreen$ = this.screenService.isVerticalScreen$;

  ngOnInit() {
  }

}
