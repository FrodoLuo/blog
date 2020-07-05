import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { ScreenService } from 'src/app/services/screen.service';
import { IMedia } from 'src/app/services/models/media.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  constructor(
    private albumService: AlbumService,
    private screenService: ScreenService
  ) {}

  public photos$ = this.albumService.photos$;

  public currentPage$ = this.albumService.currentPage$;

  public hasMore$ = this.albumService.hasMore$;

  public currentPhoto: null | IMedia = null;

  public isVertical$ = this.screenService.isVerticalScreen$;

  public loading = true;

  private subscriptions = new Subscription();

  public ngOnInit(): void {
    this.subscriptions.add(
      this.albumService.photos$.subscribe(photos => {
        this.currentPhoto = photos[0] || null;
      })
    );
    this.albumService.getMedias();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public selectPhoto(photo: IMedia): void {
    if (photo === this.currentPhoto) {
      return;
    }
    this.loading = true;
    this.currentPhoto = photo;
  }

  public nextPage(): void {
    this.albumService.getMedias(this.currentPage$.getValue() + 1);
  }

  public prevPage(): void {
    this.albumService.getMedias(this.currentPage$.getValue() - 1);
  }
}
