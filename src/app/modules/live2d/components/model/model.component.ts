import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScreenService } from 'src/app/services/screen.service';
import { Live2dCoreService } from '../../services/live2d-core.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModelComponent implements AfterViewInit {
  @ViewChild('container')
  public container: ElementRef<HTMLCanvasElement>;

  constructor(
    private live2dService: Live2dCoreService,
    public screenService: ScreenService
  ) {}

  ngAfterViewInit(): void {
    this.live2dService.loadScripts(this.container.nativeElement);
  }
}
