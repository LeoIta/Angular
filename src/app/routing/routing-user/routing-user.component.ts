import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-routing-user',
  templateUrl: './routing-user.component.html',
  styleUrls: ['./routing-user.component.css'],
})
export class RoutingUserComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  user: User = {
    firstname: 'string',
    lastname: 'string',
    age: 0,
  };

  firstname = 'string';
  lastname = 'string';
  age = 0;

  index = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      this.user = this.usersService.getUser(this.index);
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.age = this.user.age;
    });
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

  onSave() {
    let newUser = {
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age,
    };
    this.usersService.updateUser(newUser, this.index);
    this.onCancel();
  }
}
