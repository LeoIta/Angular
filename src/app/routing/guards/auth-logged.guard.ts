import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authLoggedGuard: CanActivateFn = (route, state) => {
  console.log('auth log guard');
  return inject(AuthService).isUserLogged();
};
