import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService, EVENTS } from '../../../../services/event.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.emit(EVENTS.SET_FULLSCREEN, true);
  }

  ngOnDestroy() {
    this.eventService.emit(EVENTS.SET_FULLSCREEN, false);
  }

}
