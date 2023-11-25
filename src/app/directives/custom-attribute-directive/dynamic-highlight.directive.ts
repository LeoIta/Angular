import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDynamicHighlight]',
})
export class DynamicHighlightDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setBgColor('lightblue');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBgColor('pink');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBgColor('transparent');
  }

  setBgColor(color: string) {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      color
    );
  }
}
