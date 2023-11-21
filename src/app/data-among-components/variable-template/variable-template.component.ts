import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-variable-template',
  templateUrl: './variable-template.component.html',
  styleUrls: ['./variable-template.component.css'],
})
export class VariableTemplateComponent implements AfterViewInit {
  @ViewChild('inputForm') myGenericElement: any;
  @ViewChild('inputForm') myGenericRefElement!: ElementRef;
  @ViewChild('inputForm') myInputRefElement!: ElementRef<HTMLInputElement>;

  myInput = '';

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    //myGenericElement will not suggest nativeElement as it is of type any
    //myGenericRefElement will not suggest value as it is of generic type ElementRef
    //myInputRefElement will suggest value as it is of type ElementRef<HTMLInputElement>
    console.log(`myInputRefElement of type ElementRef<HTMLInputElement>`);
    console.log('myInputRefElement');
    console.log(this.myInputRefElement);
    console.log('myInputRefElement.nativeElement');
    console.log(this.myInputRefElement.nativeElement);
    console.log('myInputRefElement.nativeElement.value');
    console.log(this.myInputRefElement.nativeElement.value);
    // More specific you are with types and more suggestions you'll get by TypeScript
  }

  onInput() {
    this.myInput = this.myInputRefElement.nativeElement.value;
  }
}
