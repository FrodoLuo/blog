import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventEmitter = new Subject<{event: EVENTS, payload: any}>();

  public subscribe(key: EVENTS, handler: (payload: any) => any): Subscription {
    return this.eventEmitter.pipe(
      filter(v => v.event === key),
      map(payload => payload.payload)
    ).subscribe(handler);
  }

  public emit(event: EVENTS, payload: any): void {
    this.eventEmitter.next({
      event, payload
    });
  }
}

export enum EVENTS {
  SET_FULLSCREEN
}
