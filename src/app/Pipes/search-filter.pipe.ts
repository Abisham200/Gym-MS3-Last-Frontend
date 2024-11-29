import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../Modals/user';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: User[], ...args: string[]): User[] {
    const searchText = args[0];
    // if (!members || !searchText) {
    //   return members; // Return all members if no search text is entered
    // }

    // searchText = searchText.toLowerCase(); // Convert search text to lowercase for case-insensitive search

    return value.filter(member => 
      member.firstName.toLowerCase().includes(searchText) ||
      member.lastName.toLowerCase().includes(searchText) ||
      member.nic.toLowerCase().includes(searchText)
    );
  }
  

}
