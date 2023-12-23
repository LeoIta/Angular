import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Contact } from '../models/contact.model';

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

  id?: number;
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
      this.id = parseInt(params['id']);
      this.contact = this.contactsService.getContact(this.id);
    });
    if (this.id! > this.max || this.id! < this.min) {
      this.router.navigate(['error']);
    }
  }

  toPrevious() {
    if (this.id! < this.max && this.id! > this.min) {
      this.id!--;
      this.router.navigate(['../', this.id], { relativeTo: this.route });
    }
  }

  toNext() {
    if (this.id! < this.max - 1 && this.id! >= this.min) {
      this.id!++;
      this.router.navigate(['../', this.id], { relativeTo: this.route });
    }
  }
}
