import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  private userSub: Subscription = new Subscription();
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  isAuthenticated = false;
  ngOnInit(): void {
    this.authorizationService.autoLogin();
    this.userSub = this.authorizationService.user.subscribe((user) => {
      // this.isAuthenticated = user ? true : false;
      this.isAuthenticated = user.token !== '';
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  toTeams() {
    this.isAuthenticated;
    // ? this.router.navigate(['/teams'])
    // : this.router.navigate(['/login']);
    this.router.navigate(['/teams']);
  }

  logout() {
    this.authorizationService.logout();
  }
}
