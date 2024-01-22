import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './filter-pipe/filter-pipe.component';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const filtered = [];
    for (const item of value) {
      if (item[propName].includes(filterString)) {
        filtered.push(item);
      }
    }
    return filtered;
  }
}
