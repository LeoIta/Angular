import { ResolveFn, Router } from '@angular/router';
import { User } from '../models/user.model';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';

export const userResolver: ResolveFn<User> = (route, state) => {
  let index = +route.params['id'];
  console.log('index: ' + index);
  let size = inject(UsersService).getUsers().length;
  if (index > -1 && index < size) {
    return inject(UsersService).getUser(index);
  } else {
    inject(Router).navigate(['error']);
    return { firstname: '', lastname: '', age: 0 };
  }
};
