import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenImageComponent } from './components/fullscreen-image/fullscreen-image.component';
import { FullscreenImageService } from 'src/app/services/fullscreen-image.service';



@NgModule({
  declarations: [FullscreenImageComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FullscreenImageComponent
  ],
  providers: [
    FullscreenImageService
  ]
})
export class ImageEffectsModule { }
