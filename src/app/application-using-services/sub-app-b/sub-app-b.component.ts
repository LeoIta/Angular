import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-sub-app-b',
  templateUrl: './sub-app-b.component.html',
  styleUrls: ['./sub-app-b.component.css'],
  providers: [AnimalsService],
})
export class SubAppBComponent {
  constructor(
    private peopleService: PeopleService,
    private animalsService: AnimalsService
  ) {}

  @ViewChild('subBInput') input!: ElementRef<HTMLInputElement>;
  text = '';
  people = this.peopleService.people;
  animals = this.animalsService.animals;
  addAnimals(animal: string) {
    this.animalsService.addAnimals(animal);
  }
  addPeople(person: string) {
    this.peopleService.addPeople(person);
  }
  update() {
    this.text = this.input.nativeElement.value;
  }
}
