import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.css'],
})
export class NgForComponent {
  numbers = [1, 2, 3, 4];
  letters = ['a', 'b', 'c', 'd'];
}
