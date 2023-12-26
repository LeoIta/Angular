import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { EditField } from '../models/edit-field.model';

@Component({
  selector: 'app-routing-user',
  templateUrl: './routing-user.component.html',
  styleUrls: ['./routing-user.component.css'],
})
export class RoutingUserComponent implements OnInit, EditField {
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  isLogged(): boolean {
    return this.logged;
  }
  isAdmin(): boolean {
    return this.admin;
  }
  isSaved(): boolean {
    return this.saved;
  }

  user: User = {
    firstname: 'string',
    lastname: 'string',
    age: 0,
  };

  firstname = 'string';
  lastname = 'string';
  age = 0;
  saved = false;
  index = 0;
  logged = true;
  admin = false;

  ngOnInit(): void {
    console.log('component init');
    // this.route.params.subscribe((params: Params) => {
    //   this.index = +params['id'];
    //   if (this.index > -1 && this.index < this.usersService.getUsers().length) {
    //     this.user = this.usersService.getUser(this.index);
    this.route.data.subscribe((data: Data) => {
      this.user = data['user'];
      console.log(this.user);
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.age = this.user.age;
    });

    // } else {
    //   this.router.navigate(['error']);
    // }
    // });
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.logged = queryParams['logged'] === 'true';
      this.admin = queryParams['admin'] === 'true';
    });
  }

  onCancel() {
    this.saved = false;
    this.router.navigate(['/users'], { queryParamsHandling: 'preserve' });
  }

  onSave() {
    let newUser = {
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age,
    };
    this.usersService.updateUser(newUser, this.index);
    this.saved = true;
    this.router.navigate(['/users'], { queryParamsHandling: 'preserve' });
  }

  anyChange() {
    return (
      this.user.age !== this.age ||
      this.user.firstname !== this.firstname ||
      this.user.lastname !== this.lastname
    );
  }
}
