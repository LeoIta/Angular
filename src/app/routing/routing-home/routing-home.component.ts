import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-routing-home',
  templateUrl: './routing-home.component.html',
  styleUrls: ['./routing-home.component.css'],
})
export class RoutingHomeComponent {
  constructor(private auth: AuthService) {}

  onLogout() {
    this.auth.isLogged = false;
    this.auth.isAdmin = false;
  }
  onLoginAsAdmin() {
    this.auth.isLogged = true;
    this.auth.isAdmin = true;
  }
  onLogin() {
    this.auth.isLogged = true;
  }
}
