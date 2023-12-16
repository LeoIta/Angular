import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-routing-users',
  templateUrl: './routing-users.component.html',
  styleUrls: ['./routing-users.component.css'],
  providers: [UsersService],
})
export class RoutingUsersComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  users: User[] = [];

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
  }

  login() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { logged: true },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
  }

  addAdmin() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { admin: true },
      queryParamsHandling: 'merge',
    });
  }
}
