import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './pages/album/album.component';



@NgModule({
  declarations: [AlbumComponent],
  imports: [
    AlbumRoutingModule,
    CommonModule
  ]
})
export class AlbumModule { }
