import { Component } from '@angular/core';
import { FullscreenImageService } from 'src/app/services/fullscreen-image.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-fullscreen-image',
  templateUrl: './fullscreen-image.component.html',
  styleUrls: ['./fullscreen-image.component.scss']
})
export class FullscreenImageComponent {

  constructor(
    private fullscreenImageService: FullscreenImageService
  ) {
    this.fullscreenImageService.showImage$
      .pipe(
        tap(() => { this.isDisplay = true; })
      )
      .subscribe(this.currentImageSrc$);
  }

  public isDisplay = false;

  public currentImageSrc$ = new BehaviorSubject<string>(null);

}
