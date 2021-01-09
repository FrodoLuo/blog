import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/modules/album/services/album.service';
import { ScreenService } from 'src/app/services/screen.service';
import { IMedia } from 'src/app/models/media.model';
import { map } from 'rxjs/operators';
import { FullscreenImageService } from 'src/app/services/fullscreen-image.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(
    public albumService: AlbumService,
    public screenService: ScreenService,
    private fullScreen: FullscreenImageService
  ) {}

  public photoGroup$ = [
    this.albumService.photos$.pipe(map((v) => v.filter((_, i) => i % 2 === 0))),
    this.albumService.photos$.pipe(map((v) => v.filter((_, i) => i % 2 === 1))),
  ];

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
