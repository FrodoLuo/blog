import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullscreenImageService {

  public showImage$ = new Subject<string>();
}
