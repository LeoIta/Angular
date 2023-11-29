import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-sub-app-a',
  templateUrl: './sub-app-a.component.html',
  styleUrls: ['./sub-app-a.component.css'],
  providers: [PeopleService],
})
export class SubAppAComponent {
  constructor(
    private peopleService: PeopleService,
    private animalsService: AnimalsService
  ) {}

  @ViewChild('subAInput') input!: ElementRef<HTMLInputElement>;
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
