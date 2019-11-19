import {Injectable, Inject, Optional} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Request} from 'express';
import {REQUEST} from '@nguniversal/express-engine/tokens';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(@Optional() @Inject(REQUEST) protected request: Request) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let serverReq: HttpRequest<any> = req;
    console.log('reach intercept', req.url);
    if (this.request) {
      let newUrl = `${this.request.protocol}://119.23.200.164`;
      if (!req.url.startsWith('/')) {
        newUrl += '/';
      }
      newUrl += req.url;
      console.log(newUrl);
      serverReq = req.clone({url: newUrl});
    }
    return next.handle(serverReq);
  }
}
