import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPosition]',
})
export class PositionDirective {
  constructor(public viewContainer: ViewContainerRef) {}
}
