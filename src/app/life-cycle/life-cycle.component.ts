import {
  Component,
  OnInit,
  OnDestroy,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styleUrls: ['./life-cycle.component.css'],
})
export class LifeCycleComponent
  implements
    OnInit,
    OnDestroy,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnChanges
{
  @Output() boolEvent = new EventEmitter();
  @Input() name: string = '';
  constructor() {
    console.log('constructor for ' + this.constructor.name);
  }

  ngOnInit(): void {
    console.log('log generated in ngOnInit');
  }
  ngOnDestroy(): void {
    console.log('log generated in ngOnDestroy');
  }
  ngDoCheck(): void {
    console.log('log generated in ngDoCheck');
  }
  ngAfterContentInit(): void {
    console.log('log generated in ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('log generated in ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('log generated in ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('log generated in ngAfterViewChecked');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('log generated in ngOnChanges');
    console.log(changes);
  }

  onClick() {
    this.boolEvent.emit(false);
  }
}
