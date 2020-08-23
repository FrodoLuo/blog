import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMedia } from './models/media.model';


const sortRes = (res: IMedia[]) => {
  res.sort((a, b) => (a.orderReference - b.orderReference));
  return res;
};

const mapMediaToCareer = (res: IMedia[]) => {
  return res.map(media => ({
    source: media.source,
    year: media.description
  }));
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

  public career$ = new BehaviorSubject<CareerDescription[]>([]);

  public friendLink$ = new BehaviorSubject<FriendLink[]>([]);

  public promote$ = new BehaviorSubject<Promote>(null);

  public fetchConfig(): void {
    this.fetchBackground();
    this.fetchCareer();
    // this.fetchFLink();
    // this.fetchPromote();
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
  public fetchCareer(): void {
    this.http.get<IMedia[]>('/api/media?tag=rail')
      .pipe(
        map(sortRes),
        map(mapMediaToCareer)
      )
      .subscribe(res => {
        this.career$.next(res);
      });
  }
  public fetchFLink(): void {
    this.http.get<{ title: string; data: FriendLink[] }>('/api/configs/detail/flink')
      .subscribe(res => {
        this.friendLink$.next(res.data);
      });
  }
  public fetchPromote(): void {
    this.http.get<ConfigRes<Promote>>('/api/configs/detail/promote')
      .subscribe(res => {
        if (res === null) { 
          this.promote$.next(null);
        } else {
          this.promote$.next(res.data);
        }
      });
  }
}

interface ConfigRes<T> {
  title: string;
  data: T;
}

export interface CareerDescription {
  source: string;
  year: string;
}

export interface FriendLink {
  name: string;
  href: string;
}

export interface Promote {
  href: string;
  source: string;
}

export interface BackgroundInfo {
  src: string;
  description: string;
}