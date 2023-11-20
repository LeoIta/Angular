import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StringInterpolationComponent } from './string-interpolation/string-interpolation.component';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { PropertyBindingComponent } from './property-binding/property-binding.component';
import { EventBindingComponent } from './event-binding/event-binding.component';
import { ServersComponent } from './servers/servers.component';
import { TwoWayBindingComponent } from './two-way-binding/two-way-binding.component';
import { ParentComponent } from './data-among-components/data-parent-to-child/parent/parent.component';
import { ChildComponent } from './data-among-components/data-parent-to-child/child/child.component';
import { ChildAnotherComponent } from './data-among-components/data-parent-to-child/child-another/child-another.component';

@NgModule({
  declarations: [
    AppComponent,
    ServersComponent,
    StringInterpolationComponent,
    LifeCycleComponent,
    PropertyBindingComponent,
    EventBindingComponent,
    TwoWayBindingComponent,
    ParentComponent,
    ChildComponent,
    ChildAnotherComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
