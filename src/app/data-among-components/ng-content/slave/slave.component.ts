import {
  AfterContentChecked,
  Component,
  ContentChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-slave',
  templateUrl: './slave.component.html',
  styleUrls: ['./slave.component.css'],
})
export class SlaveComponent implements AfterContentChecked {
  mappedValue = '';

  @ContentChild('inputForm') value!: ElementRef<HTMLInputElement>;

  ngAfterContentChecked() {
    this.mappedValue = this.value.nativeElement.value;
  }
}
