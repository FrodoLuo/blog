import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutBrief'
})
export class CutBriefPipe implements PipeTransform {

  transform(value: string | number, ...args: any[]): any {
    const str = String(value);
    return str.split('\n').slice(0, 5).join(' ');
  }

}
