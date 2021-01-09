import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelComponent } from './components/model/model.component';
import { Live2dCoreService } from './services/live2d-core.service';

@NgModule({
  declarations: [ModelComponent],
  imports: [CommonModule],
  exports: [ModelComponent],
  providers: [Live2dCoreService],
})
export class Live2dModule {}
