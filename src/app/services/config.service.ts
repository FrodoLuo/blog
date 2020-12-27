import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMedia } from '../models/media.model';


const sortRes = (res: IMedia[]) => {
  res.sort((a, b) => (a.orderReference - b.orderReference));
  return res;
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private http: HttpClient
  ) {
    this.fetchConfig();
  }

  public indexBackground$ = new BehaviorSubject<BackgroundInfo>({ src: '', description: '' });

  public friendLink$ = new BehaviorSubject<FriendLink[]>([]);

  public hotTags$ = new BehaviorSubject<string[]>([]);

  public fetchConfig(): void {
    this.fetchBackground();
    this.fetchTags();
    this.fetchFLink();
  }

  public fetchBackground(): void {
    this.http.get<IMedia[]>('/api/media?tag=banner')
      .pipe(
        map(sortRes)
      )
      .subscribe(res => {
        const randomedBackground = res[Math.floor(Math.random() * res.length)];
        this.indexBackground$.next({
          src: randomedBackground.source,
          description: randomedBackground.description
        });
      });
  }
  public fetchFLink(): void {
    this.http.get<{ title: string; data: string }>('/api/configs/detail/flinks')
      .pipe(
        map(res => {
          return JSON.parse(res.data) as FriendLink[];
        })
      )
      .subscribe(res => {
        this.friendLink$.next(res);
      });
  }
  public fetchTags(): void {
    this.http.get<{ title: string; data: string }>('/api/configs/detail/tags')
      .pipe(
        map(res => {
          return JSON.parse(res.data) as string[];
        })
      )
      .subscribe(res => {
        console.log(res);
        this.hotTags$.next(res);
      });
  }
}

export interface FriendLink {
  title: string;
  href: string;
}

export interface BackgroundInfo {
  src: string;
  description: string;
}