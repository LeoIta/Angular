import { Component } from '@angular/core';
import { Person } from '../person.model';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {
  people = [
    new Person('John', 'User001'),
    new Person('Paul', 'User002'),
    new Person('Tom', 'User003'),
  ];
}
