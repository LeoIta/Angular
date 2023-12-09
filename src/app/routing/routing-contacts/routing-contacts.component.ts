import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-routing-contacts',
  templateUrl: './routing-contacts.component.html',
  styleUrls: ['./routing-contacts.component.css'],
  providers: [ContactsService],
})
export class RoutingContactsComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  id = -1;
  max = 0;
  min = 0;

  contact = {
    firstname: 'string',
    lastname: 'string',
    age: 0,
    confirmed: true,
  };

  contacts: Contact[] = [];

  ngOnInit(): void {
    this.contacts = this.contactsService.getContacts();
    this.max = this.contacts.length;
    this.route.params.subscribe((params: Params) => {
      this.id = isNaN(params['id']) ? -1 : parseInt(params['id']);
      if (this.id !== -1) {
        this.contact = this.contactsService.getContact(this.id);
      }
    });
  }

  toPrevious() {
    if (this.id < this.max && this.id > this.min) {
      this.id--;
      this.router.navigate(['../', this.id], { relativeTo: this.route });
    }
  }

  toNext() {
    if (this.id < this.max - 1 && this.id >= this.min) {
      this.id++;
      this.router.navigate(['../', this.id], { relativeTo: this.route });
    }
  }
}
