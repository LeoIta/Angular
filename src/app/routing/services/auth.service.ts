import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged = false;
  isAdmin = false;
  constructor() {}

  isUserLogged() {
    return this.isLogged;
  }

  isUserAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.isAdmin);
    });
  }
}
