import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any[], field: any): any[] {
    return value.sort((a, b) => (a[field] > b[field] ? -1 : 1));
  }
}
