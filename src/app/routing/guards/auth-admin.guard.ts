import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authAdminGuard: CanActivateFn = async (route, state) => {
  console.log('auth admin guard');
  let router = inject(Router);
  const isAdmin = await inject(AuthService).isUserAdmin();
  if (isAdmin) {
    return true;
  } else {
    router.navigate(['401']);
    return false;
  }
};
