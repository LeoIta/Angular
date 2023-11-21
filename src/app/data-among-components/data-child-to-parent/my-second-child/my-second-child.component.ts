import { Component, EventEmitter, Output } from '@angular/core';
import { Person } from '../../person.model';

@Component({
  selector: 'app-my-second-child',
  templateUrl: './my-second-child.component.html',
  styleUrls: ['./my-second-child.component.css'],
})
export class MySecondChildComponent {
  @Output('engClass') secondClass = new EventEmitter<Person[]>();
  classEng = [new Person('Paul', 'User01'), new Person('Tom', 'User02')];
  onClick() {
    this.secondClass.emit(this.classEng);
  }
}
