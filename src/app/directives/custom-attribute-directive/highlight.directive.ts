import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private element: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setBgColor('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBgColor('transparent');
  }

  ngOnInit() {
    this.setBgColor('salmon');
  }

  setBgColor(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
