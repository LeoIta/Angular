import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { catchError, map, of } from 'rxjs';

export const HttpResolver: ResolveFn<any> = (_route, _state) => {
  console.log('trying to call server ... ');
  return inject(FirebaseService)
    .retrieveCustomers()
    .pipe(
      map((result) => result),
      catchError((error) => {
        return of({ error: error });
      })
    );
};
