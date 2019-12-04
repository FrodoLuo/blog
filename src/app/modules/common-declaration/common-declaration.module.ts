import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnScrollShowDirective } from 'src/app/directives/on-scroll-show.directive';
import { StickyDirective } from '../../directives/sticky.directive';



@NgModule({
  declarations: [
    OnScrollShowDirective,
    StickyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OnScrollShowDirective,
    StickyDirective
  ]
})
export class CommonDeclarationModule { }
