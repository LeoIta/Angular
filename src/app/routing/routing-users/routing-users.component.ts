import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-routing-users',
  templateUrl: './routing-users.component.html',
  styleUrls: ['./routing-users.component.css'],
  providers: [UsersService],
})
export class RoutingUsersComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  users: User[] = [];

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
  }
}
