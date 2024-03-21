import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  // Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { AuthUser } from './auth_user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  // user = new Subject<AuthUser>();
  defaultUser = new AuthUser('', '', '', new Date(Date.now()));
  user = new BehaviorSubject<AuthUser>(this.defaultUser);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}
  apiKey = 'AIzaSyBAPLwrtPrimspY4Ps1T9Hqs5711wlimfg';
  signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

  doSignUp(email: String, password: String) {
    return this.http
      .post<AuthResponseData>(this.signUpUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((err) => this.handleSignupError(err)),
        tap((data) => {
          this.handleAuthorization(data);
        })
      );
  }

  private handleAuthorization(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new AuthUser(
      data.email,
      data.localId,
      data.idToken,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(data.expiresIn * 1000);
    localStorage.setItem('localUser', JSON.stringify(user));
  }

  private handleSignupError(webError: any) {
    let errorMessage = 'Unknown error';
    if (webError.error === null && webError.error.error === null) {
      return throwError(() => errorMessage);
    }
    if (webError.error.error.message === 'EMAIL_EXISTS') {
      errorMessage = 'The email address is already in use by another account.';
    }
    return throwError(() => errorMessage);
  }

  autoLogin() {
    let localUser = localStorage.getItem('localUser');
    if (!!localUser) {
      const authUser: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localUser);
      const expDate = new Date(authUser._tokenExpirationDate);
      const user = new AuthUser(
        authUser.email,
        authUser.id,
        authUser._token,
        expDate
      );
      if (user.token) {
        this.user.next(user);
        const expirationDuration = expDate.getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  doLogin(email: String, password: String) {
    return this.http
      .post<AuthResponseData>(this.loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          return this.handleLoginError(err);
        }),
        tap((data) => this.handleAuthorization(data))
      );
  }

  handleLoginError(webError: any) {
    let errorMessage = 'Wrong email or password';
    if (webError.error === null && webError.error.error === null) {
      return throwError(() => errorMessage);
    }
    if (webError.error.error.message === 'INVALID_LOGIN_CREDENTIALS') {
      errorMessage = 'User does not exist or the password is invalid.';
    }
    return throwError(() => errorMessage);
  }

  logout() {
    this.user.next(this.defaultUser);
    this.router.navigate(['/login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    localStorage.removeItem('localUser');
  }
}
