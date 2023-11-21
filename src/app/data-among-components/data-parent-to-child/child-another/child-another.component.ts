import { Component, Input } from '@angular/core';
import { Person } from '../../person.model';

@Component({
  selector: 'app-child-another',
  templateUrl: './child-another.component.html',
  styleUrls: ['./child-another.component.css'],
})
export class ChildAnotherComponent {
  @Input('childAnotherArray') childData: Person[] = [];

  ngAfterContentChecked(): void {
    this.childData = this.childData.map(
      (person) =>
        new Person(person.username.toLowerCase(), person.userId.toLowerCase())
    );
  }
}
