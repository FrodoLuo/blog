import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './pages/album/album.component';
import { MaterialModule } from '../material/material.module';
import { CommonDeclarationModule } from '../common-declaration/common-declaration.module';



@NgModule({
  declarations: [AlbumComponent],
  imports: [
    AlbumRoutingModule,
    CommonModule,
    CommonDeclarationModule,
    MaterialModule
  ],
})
export class AlbumModule { }
