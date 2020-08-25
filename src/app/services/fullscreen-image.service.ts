import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FullscreenImageService {

  public showImage$ = new Subject<string>();
}
