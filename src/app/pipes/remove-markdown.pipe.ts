import { Pipe, PipeTransform } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const removemarkdown = require('remove-markdown');

@Pipe({
  name: 'removeMarkdown'
})
export class RemoveMarkdownPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return removemarkdown(value);
  }

}
