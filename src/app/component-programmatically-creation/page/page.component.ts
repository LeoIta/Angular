import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { PositionDirective } from '../position.directive';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent {
  // constructor(private viewContainer: ViewContainerRef) {}
  hidden: boolean = false;
  name = 'John';
  @ViewChild(PositionDirective)
  dynamicComponent!: PositionDirective;

  hide() {
    this.hidden = true;
    // this.viewContainer.clear();
    this.dynamicComponent.viewContainer.clear();
  }
  display() {
    this.hidden = false;
    this.showAlert('Mike');
  }

  showAlert(message: string) {
    // const alertComponent = this.viewContainer.createComponent(AlertComponent);
    const viewContainer = this.dynamicComponent.viewContainer;
    viewContainer.clear();
    const alertComponentRef = viewContainer.createComponent(AlertComponent);
    alertComponentRef.instance.name = message;
  }
}
