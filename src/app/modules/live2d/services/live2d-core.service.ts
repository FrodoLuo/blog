import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class Live2dCoreService {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  public loadScripts(canvas: HTMLCanvasElement): void {
    canvas.width = 250;
    canvas.height = 500;
    const script: HTMLScriptElement = this.document.createElement('script');
    script.onload = () => {
      window.launchLive2d(canvas, null);
    };
    script.type = 'text/javascript';
    script.crossOrigin = 'true';
    script.src = 'https://static.frodoluo.ink/live2d/bundle.js';
    // script.src = '/assets/lib/bundle.js';
    document.head.appendChild(script);
  }
}
