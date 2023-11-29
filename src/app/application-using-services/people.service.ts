import { Injectable, inject } from '@angular/core';
import { MainService } from './main.service';

@Injectable()
export class PeopleService {
  constructor(private mainService: MainService) {}
  people = ['John', 'Paul', 'Holly'];

  addPeople(person: string) {
    this.people.push(person);
  }

  addColors(color: string) {
    this.mainService.colors.push(color);
  }

  getColors() {
    return this.mainService.colors;
  }
}
