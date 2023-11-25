import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAdvancedHighlight]',
})
export class AdvancedHighlightDirective {
  @HostBinding('style.backgroundColor') bgColor: string = '';
  @Input() overColor: string = 'transparent';
  @Input() awayColor: string = 'transparent';

  ngOnInit() {
    this.bgColor = 'transparent';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.bgColor = this.overColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.bgColor = this.awayColor;
  }
}
