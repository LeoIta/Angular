import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optsubstring',
})
export class OptsubstringPipe implements PipeTransform {
  transform(
    value: string,
    options: { start: number | 0; end?: number }
  ): string {
    return value.substring(options.start, options.end);
  }
}
