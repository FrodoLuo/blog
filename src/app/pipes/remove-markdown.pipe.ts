import { Pipe, PipeTransform } from '@angular/core';
import removemarkdown from 'remove-markdown';

@Pipe({
  name: 'removeMarkdown'
})
export class RemoveMarkdownPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return removemarkdown(value);
  }

}
