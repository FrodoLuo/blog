import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


const addApi = (res: IMediaRes[]) => {
  return res.map(media => {
    const r = { ...media };
    r.source.url = '/api' + r.source.url;
    return r;
  });
};

const sortRes = (res: IMediaRes[]) => {
  res.sort((a, b) => (a.orderReference - b.orderReference));
  return res;
};

const mapMediaToCareer = (res: IMediaRes[]) => {
  return res.map(media => ({
    source: media.source.url,
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

  public indexBackground$ = new BehaviorSubject<string>('');

  public career$ = new BehaviorSubject<CareerDescription[]>([]);

  public friendLink$ = new BehaviorSubject<FriendLink[]>([]);

  public promote$ = new BehaviorSubject<Promote>(null);

  public fetchConfig() {
    this.fetchBackground();
    this.fetchCareer();
    this.fetchFLink();
    this.fetchPromote();
  }

  public fetchBackground() {
    this.http.get<IMediaRes[]>('/api/media?tag=banner')
      .pipe(
        map(addApi),
        map(sortRes)
      )
      .subscribe(res => {
        this.indexBackground$.next(res[Math.floor(Math.random() * res.length)].source.url);
      });
  }
  public fetchCareer() {
    this.http.get<IMediaRes[]>('/api/media?tag=rail')
      .pipe(
        map(addApi),
        map(sortRes),
        map(mapMediaToCareer)
      )
      .subscribe(res => {
        this.career$.next(res);
      });
  }
  public fetchFLink() {
    this.http.get<Array<{ title: string; data: FriendLink[] }>>('/api/configs?title=flink')
      .pipe(
        map(res => res[0])
      )
      .subscribe(res => {
        this.friendLink$.next(res.data);
      });
  }
  public fetchPromote() {
    this.http.get<Array<ConfigRes<Promote>>>('/api/configs?title=promote')
      .pipe(
        map(res => res[0] || null)
      )
      .subscribe(res => {
        if (res === null) { this.promote$.next(null); } else {
          this.promote$.next(res.data);
        }
      });
  }
}

interface IMediaRes {
  id: number;
  description: string;
  tag: 'cover' | 'standard' | 'rail';
  orderReference: number;
  created_at: string;
  updated_at: string;
  source: IMedia;
}

interface ConfigRes<T> {
  title: string;
  data: T;
}
export interface IMedia {
  id: number;
  name: string;
  hash: string;
  url: string;
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
