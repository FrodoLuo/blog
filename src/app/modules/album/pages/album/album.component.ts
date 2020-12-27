import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from 'src/app/modules/album/services/album.service';
import { ScreenService } from 'src/app/services/screen.service';
import { IMedia } from 'src/app/models/media.model';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FullscreenImageService } from 'src/app/services/fullscreen-image.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(
    private albumService: AlbumService,
    private fullScreen: FullscreenImageService,
    private screenService: ScreenService
  ) {}

  public photos$ = this.albumService.photos$;
  public photoGroup$ = [
    this.photos$.pipe(map((v) => v.filter((_, i) => i % 2 === 0))),
    this.photos$.pipe(map((v) => v.filter((_, i) => i % 2 === 1))),
  ];
  public currentPage$ = this.albumService.currentPage$;
  public countOfPhotos$ = this.albumService.countOfPhotos$;
  public screenSize$ = this.screenService.currentScreenSize$;

  public ngOnInit(): void {
    this.albumService.getMedias();
  }

  public setPage(page: number): void {
    this.albumService.getMedias(page);
  }

  public setFull(photo: IMedia): void {
    this.fullScreen.showImage$.next(photo.source);
  }
}
