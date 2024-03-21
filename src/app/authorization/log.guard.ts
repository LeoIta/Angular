import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { map, take, tap } from 'rxjs';

export const logGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  return inject(AuthorizationService).user.pipe(
    take(1),
    map((user) => {
      return !!user.token;
    }),
    tap((bool) => {
      if (!bool) {
        router.navigate(['/login']);
      }
    })
  );
};
