import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMedia } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  public photos = new BehaviorSubject<IMedia[]>([]);

  

}
