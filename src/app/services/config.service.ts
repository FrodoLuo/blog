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

  public fetchConfig() {
    this.fetchBackground();
    this.fetchCareer();
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
