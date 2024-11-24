import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(members: any[], searchText: string): any[] {
    if (!members || !searchText) {
      return members; // Return all members if no search text is entered
    }

    searchText = searchText.toLowerCase(); // Convert search text to lowercase for case-insensitive search

    return members.filter(member => 
      member.firstName.toLowerCase().includes(searchText) ||
      member.lastName.toLowerCase().includes(searchText) ||
      member.address.toLowerCase().includes(searchText) ||
      member.nic.toLowerCase().includes(searchText)
    );
  }

  

}
