import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMedia } from './models/media.model';
import { HttpClient } from '@angular/common/http';
import { AlbumModule } from '../modules/album/album.module';

@Injectable({
  providedIn: AlbumModule,
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  public photos$ = new BehaviorSubject<IMedia[]>([]);

  public currentPage$ = new BehaviorSubject<number>(0);

  public hasMore$ = new BehaviorSubject<boolean>(false);

  private PAGE_SIZE = 5;

  private locking = false;

  public getMedias(page = 0): void {
    if (this.locking) {
      return;
    }
    this.locking = true;
    this.currentPage$.next(page);
    this.http
      .get<number>('/api/media/count', {
        params: {
          tag: ['banner', 'standard'],
          _sort: 'created_at:DESC',
          _start: `${page * this.PAGE_SIZE}`,
          _limit: `${this.PAGE_SIZE}`,
        },
      })
      .subscribe((res) => {
        if (Math.floor(res / this.PAGE_SIZE) > this.currentPage$.getValue()) {
          this.hasMore$.next(true);
        } else {
          this.hasMore$.next(false);
        }
      });
    this.http
      .get<IMedia[]>('/api/media', {
        params: {
          tag: ['banner', 'standard'],
          _sort: 'created_at:DESC',
          _start: `${page * this.PAGE_SIZE}`,
          _limit: `${this.PAGE_SIZE}`,
        },
      })
      .subscribe((res) => {
        this.photos$.next(res);
        this.locking = false;
      });
  }
}
