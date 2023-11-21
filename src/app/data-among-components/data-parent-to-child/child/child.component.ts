import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  Input,
} from '@angular/core';
import { Person } from '../../person.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent {
  @Input() childDataArray: Person[] = [];

  ngAfterContentChecked(): void {
    this.childDataArray = this.childDataArray.map(
      (person) =>
        new Person(person.username.toUpperCase(), person.userId.toUpperCase())
    );
  }
}
