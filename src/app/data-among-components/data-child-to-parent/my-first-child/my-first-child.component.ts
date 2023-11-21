import { Component, EventEmitter, Output } from '@angular/core';
import { Person } from '../../person.model';

@Component({
  selector: 'app-my-first-child',
  templateUrl: './my-first-child.component.html',
  styleUrls: ['./my-first-child.component.css'],
})
export class MyFirstChildComponent {
  @Output() firstClass = new EventEmitter<Person[]>();
  classIta = [new Person('Carlo', 'Utente01'), new Person('Paolo', 'Utente02')];
  onClick() {
    this.firstClass.emit(this.classIta);
  }
}
