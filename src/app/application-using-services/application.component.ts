import { Component, ElementRef, ViewChild } from '@angular/core';
import { PeopleService } from './people.service';
import { AnimalsService } from './animals.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  providers: [PeopleService, AnimalsService],
})
export class ApplicationComponent {
  constructor(
    private peopleService: PeopleService,
    private animalsService: AnimalsService
  ) {}

  @ViewChild('globalInput') input!: ElementRef<HTMLInputElement>;
  text = '';
  people = this.peopleService.people;
  animals = this.animalsService.animals;
  colors = this.peopleService.getColors();

  addAnimals(animal: string) {
    this.animalsService.addAnimals(animal);
  }
  addPeople(person: string) {
    this.peopleService.addPeople(person);
  }
  addColors(color: string) {
    this.peopleService.addColors(color);
  }
  update() {
    this.text = this.input.nativeElement.value;
  }
}
