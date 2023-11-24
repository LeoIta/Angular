import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ng-switch',
  templateUrl: './ng-switch.component.html',
  styleUrls: ['./ng-switch.component.css'],
})
export class NgSwitchComponent {
  @ViewChild('inputNumber') input!: ElementRef<HTMLInputElement>;
  number = '';

  onChange() {
    this.number = this.input.nativeElement.value;
  }
}
