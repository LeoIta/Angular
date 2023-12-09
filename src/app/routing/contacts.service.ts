import { Contact } from './contact.model';

export class ContactsService {
  constructor() {}
  private contacts = [
    { firstname: 'Mario', lastname: 'Bros', age: 40, confirmed: true },
    { firstname: 'Michael', lastname: 'Jordan', age: 50, confirmed: false },
    { firstname: 'Sara', lastname: 'Miller', age: 30, confirmed: false },
    { firstname: 'Anna', lastname: 'Black', age: 22, confirmed: false },
    { firstname: 'Tom', lastname: 'White', age: 66, confirmed: true },
    { firstname: 'Ted', lastname: 'Grey', age: 18, confirmed: true },
  ];

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: number): Contact {
    return this.contacts.slice()[id];
  }
}
