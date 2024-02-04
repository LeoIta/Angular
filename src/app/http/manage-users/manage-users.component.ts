import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { LocalUser } from '../local-user.model';
import { ActivatedRoute, Data } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  customers: LocalUser[] = [];
  error: HttpErrorResponse | null = null;

  constructor(
    private httpService: FirebaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data: Data | any) => {
        let response = data['customers'];
        if (response.error) {
          this.error = <HttpErrorResponse>response.error;
        } else {
          this.customers = response;
        }
      },
    });
    /* this.updateList(); 
      without use of HttpResolver, when loading first time the page
      the table will load the default value of this.customers, that is 
      an empty array, and will display, for the time needed to make the
      hhtp call, empty table. using the resolver, call to back end is
      done before even load the component, so from the beginning the table
      will display the real values
    */
  }

  updateList() {
    this.httpService.retrieveCustomers().subscribe({
      next: (response) => {
        this.customers = response;
      },
      error: (error) => {
        this.error = <HttpErrorResponse>error;
        console.log('trying handle error data');
      },
    });
  }

  editUser(item: LocalUser) {
    this.httpService.setCurrentUser(item);
  }
}
