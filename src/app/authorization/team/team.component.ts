import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { LocalUser } from 'src/app/http/local-user.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  constructor(private dbService: DbService) {}
  users: LocalUser[] = [];
  ngOnInit(): void {
    this.dbService
      .retrieveCustomers()
      .subscribe((value) => (this.users = value));
  }
}
