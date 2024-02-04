import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpUser } from './http-user.model';
import { LocalUser } from './local-user.model';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  url = 'https://angular-16-2d5ac-default-rtdb.firebaseio.com/';

  currentUser = new EventEmitter<LocalUser>();
  constructor(private httpClient: HttpClient) {}

  post(body: HttpUser) {
    // return this.httpClient.post(`${this.url}user.json`, body);
    return this.httpClient
      .post<{ name: string }>(`${this.url}user.json`, body)
      .pipe(
        catchError((catError) => {
          console.log('error caught');
          return throwError(() => catError);
        })
      );
  }

  customPostResponse(body: HttpUser) {
    // return this.httpClient.post(`${this.url}user.json`, body);

    let myHeaders = new HttpHeaders({
      'Custom-Header': 'Hello',
      'Content-Type': 'application/json',
    });
    myHeaders = myHeaders.append('new-header', 'newest');

    let myParams = new HttpParams().set('print', 'pretty');
    myParams = myParams.append('learn', 'well');

    const IS_CACHE_ENABLED = new HttpContextToken<boolean>(() => false);
    const myContext = new HttpContext().set(IS_CACHE_ENABLED, true);
    const observableValue = 'response';

    return this.httpClient
      .post<{ name: string }>(`${this.url}user.json`, body, {
        headers: myHeaders,
        context: myContext,
        observe: observableValue,
        params: myParams,
        // reportProgress: true,
        responseType: 'json',
        // withCredentials: false,
      })
      .pipe(
        tap((httpResponse) => {
          console.log(observableValue);
          console.log(httpResponse);
        })
      );
  }

  customPostEvents(body: HttpUser) {
    // return this.httpClient.post(`${this.url}user.json`, body);

    let myHeaders = new HttpHeaders({
      'Custom-Header': 'Hello',
      'Content-Type': 'application/json',
    });
    myHeaders = myHeaders.append('new-header', 'newest');

    let myParams = new HttpParams().set('print', 'pretty');
    myParams = myParams.append('learn', 'well');

    const IS_CACHE_ENABLED = new HttpContextToken<boolean>(() => false);
    const myContext = new HttpContext().set(IS_CACHE_ENABLED, true);

    const observableValue = 'events';

    return this.httpClient
      .post<{ name: string }>(`${this.url}user.json`, body, {
        headers: myHeaders,
        context: myContext,
        observe: observableValue,
        params: myParams,
        // reportProgress: true,
        responseType: 'json',
        // withCredentials: false,
      })
      .pipe(
        tap((eventResponse) => {
          console.log(observableValue);
          console.log(eventResponse.type);
          console.log(this.eventToString(eventResponse.type));
          console.log(eventResponse);
        })
      );
  }

  eventToString(eventNum: number): string {
    let eventDescription = '';
    switch (eventNum) {
      case 0:
        eventDescription = 'Sent - The request was sent out over the wire.';
        break;
      case 1:
        eventDescription =
          'UploadProgress - An upload progress event was received.';
        break;
      case 2:
        eventDescription =
          'ResponseHeader - The response status code and headers were received.';
        break;
      case 3:
        eventDescription =
          'DownloadProgress - A download progress event was received.';
        break;
      case 4:
        eventDescription =
          'Response - The full response including the body was received.';
        break;
      case 5:
        eventDescription =
          'User - A custom event from an interceptor or a backend.';
        break;
      default:
        eventDescription = '';
    }
    return eventDescription;
  }

  customPostBody(body: HttpUser) {
    // return this.httpClient.post(`${this.url}user.json`, body);

    let myHeaders = new HttpHeaders({
      'Custom-Header': 'Hello',
      'Content-Type': 'application/json',
    });
    myHeaders.append('new header', 'invisible');

    let myParams = new HttpParams().set('print', 'pretty');
    myParams = myParams.append('learn', 'well');

    const IS_CACHE_ENABLED = new HttpContextToken<boolean>(() => false);
    const myContext = new HttpContext().set(IS_CACHE_ENABLED, true);

    const observableValue = 'body';

    return this.httpClient
      .post<{ name: string }>(`${this.url}user.json`, body, {
        headers: myHeaders,
        context: myContext,
        observe: observableValue,
        params: myParams,
        // reportProgress: true,
        responseType: 'json',
        // withCredentials: false,
      })
      .pipe(
        tap((httpResponse) => {
          console.log(observableValue);
          console.log(httpResponse);
        })
      );
  }

  put(body: HttpUser, id: string) {
    return this.httpClient
      .put<HttpUser>(`${this.url}user/${id}.json`, body)
      .pipe(
        tap((answer) => {
          console.log('update customer with name: ' + answer.name);
        }),
        catchError((catError) => {
          console.log('error caught');
          return throwError(() => catError);
        })
      );
  }

  putWithoutType(body: HttpUser, id: string) {
    return this.httpClient.put(`${this.url}user/${id}.json`, body).pipe(
      tap((answer) => {
        console.log('update customer with name: ' + (<HttpUser>answer).name);
      })
    );
  }

  patch(body: any, id: string) {
    // return this.httpClient.patch(`${this.url}user/${id}.json`, body);
    return this.httpClient.patch(`${this.url}user/${id}.json`, body);
  }

  getAll() {
    // return this.httpClient.get(
    return this.httpClient.get<{ [key: string]: HttpUser }>(
      `${this.url}user.json`
    );
  }

  getAllWithoutType() {
    return this.httpClient.get(`${this.url}user.json`);
  }

  getSingle(id: string) {
    // return this.httpClient.get(
    return this.httpClient.get<{ [key: string]: HttpUser }>(
      `${this.url}user/${id}.json`
    );
  }

  delete(id: string) {
    // return this.httpClient.delete(`${this.url}user/${id}.json`);
    return this.httpClient.delete<void>(`${this.url}user/${id}.json`);
  }

  retrieveCustomersWithoutType() {
    return this.getAllWithoutType().pipe(
      map((users) => {
        const people: LocalUser[] = [];
        let entries = Object.entries(users);
        for (let entry of entries) {
          people.push({
            remoteId: entry[0],
            ...entry[1],
          });
        }
        return people;
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

  setCurrentUser(localUser: LocalUser) {
    this.currentUser.emit(localUser);
  }
}
