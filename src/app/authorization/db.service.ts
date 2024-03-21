import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUser } from '../http/http-user.model';
import { exhaustMap, map, take } from 'rxjs';
import { LocalUser } from '../http/local-user.model';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  url = 'https://angular-16-2d5ac-default-rtdb.firebaseio.com/';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthorizationService
  ) {}

  getAll() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        // let getUrl = `${this.url}user.json?auth=${user.token}`;
        // return this.httpClient.get<{ [key: string]: HttpUser }>(getUrl);
        let getUrl = `${this.url}user.json`;
        return this.httpClient.get<{ [key: string]: HttpUser }>(getUrl, {
          params: new HttpParams().set('auth', user.token),
        });
      })
    );
  }

  retrieveCustomers() {
    return this.getAll().pipe(
      map((users) => {
        const people: LocalUser[] = [];
        for (const key in users) {
          people.push(<LocalUser>{
            remoteId: key,
            ...users[key],
          });
        }
        return people;
      })
    );
  }
}
