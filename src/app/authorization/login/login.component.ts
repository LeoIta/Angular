import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginMode = false;
  error: string | null = null;
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginMode = false;
  }

  resetError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.loginMode = true;
  }

  onSwitch() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    this.loginMode === true ? this.doLogin(form) : this.doSignUp(form);
    form.reset();
  }

  doSignUp(form: NgForm) {
    this.authorizationService
      .doSignUp(form.value['email'], form.value['password'])
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (webErr) => {
          // this.error = this.extractError(err);
          this.error = webErr;
        },
      });
  }

  // extractError(webError: any): string {
  //   return webError.error.error.message === 'EMAIL_EXISTS'
  //     ? 'The email address is already in use by another account.'
  //     : 'Unknown error';
  // }

  doLogin(form: NgForm) {
    this.authorizationService
      .doLogin(form.value['email'], form.value['password'])
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['main']);
        },
        error: (webErr) => {
          this.error = webErr;
        },
      });
  }
}
