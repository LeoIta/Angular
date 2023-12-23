import { CanMatchFn } from '@angular/router';

export const matchGuard: CanMatchFn = (route, segments) => {
  console.log('match guard');
  return true;
};
