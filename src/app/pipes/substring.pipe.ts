import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring',
})
export class SubStringPipe implements PipeTransform {
  transform(value: string, start: number, end?: number): string {
    return value.substring(start, end);
  }
}
