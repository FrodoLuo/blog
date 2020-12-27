import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutBrief'
})
export class CutBriefPipe implements PipeTransform {

  transform(value: string | number, ...args: any[]): any {
    const str = String(value);
    const charArray = str.split('');
    if (charArray.length > 120) {
      return charArray.slice(0, 120).join('').concat('...');
    } else {
      return charArray.join('');
    }
  }

}
