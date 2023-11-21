import { Component } from '@angular/core';
import { Person } from '../../person.model';

@Component({
  selector: 'app-myparent',
  templateUrl: './myparent.component.html',
  styleUrls: ['./myparent.component.css'],
})
export class MyparentComponent {
  classInternational: Person[] = [];
  onAdd(newClass: Person[]) {
    console.log(this.classInternational);
    this.classInternational = this.classInternational.concat(newClass);
    console.log(this.classInternational);
  }
}
