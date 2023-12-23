import { User } from '../models/user.model';

export class UsersService {
  constructor() {}

  private users: User[] = [
    { firstname: 'Mario', lastname: 'Bros', age: 40 },
    { firstname: 'Michael', lastname: 'Jordan', age: 50 },
    { firstname: 'Sara', lastname: 'Miller', age: 30 },
    { firstname: 'Anna', lastname: 'Black', age: 22 },
    { firstname: 'Tom', lastname: 'White', age: 66 },
    { firstname: 'Ted', lastname: 'Grey', age: 18 },
  ];

  getUsers() {
    return this.users;
  }

  getUser(id: number): User {
    return this.users.slice()[id];
  }

  updateUser(updatedUser: User, index: number): void {
    this.users[index] = updatedUser;
  }
}
