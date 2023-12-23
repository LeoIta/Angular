import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const childGuard: CanActivateChildFn = async (childRoute, state) => {
  let router = inject(Router);
  console.log('child guard');
  const isAdmin = await inject(AuthService).isUserAdmin();
  if (isAdmin) {
    return true;
  } else {
    router.navigate(['401']);
    return false;
  }
};
