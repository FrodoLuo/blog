import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  private backgroundSrc = '';

  public ngOnInit() {

  }

  public fetchConfig() {

  }

  public fetchBackground() {
    return this.http.get('http://content.frodoluo.ink/');
  }
}
