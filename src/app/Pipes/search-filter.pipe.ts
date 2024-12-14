import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../Modals/user';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any[], searchText: string, properties: string[]): any[] {
    if (!value || !searchText) {
      return value;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    return value.filter(item =>
      properties.some(property =>
        item[property]?.toString().toLowerCase().includes(lowerCaseSearchText)
      )
    );
  }
}
