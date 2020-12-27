import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnScrollShowDirective } from 'src/app/directives/on-scroll-show.directive';
import { StickyDirective } from '../../directives/sticky.directive';
import { LoadingSpinComponent } from 'src/app/components/loading-spin/loading-spin.component';

@NgModule({
  declarations: [LoadingSpinComponent, OnScrollShowDirective, StickyDirective],
  imports: [CommonModule],
  exports: [LoadingSpinComponent, OnScrollShowDirective, StickyDirective],
})
export class CommonDeclarationModule {}
