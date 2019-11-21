import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  private static title = 'FrodoLuoの笔记';

  public setTitle(t: string) {
    this.document.title = `${t} - ${TitleService.title}`;
  }

  public removeSubTitle() {
    this.document.title = TitleService.title;
  }
}
