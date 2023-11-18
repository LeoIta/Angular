import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServersComponent } from './servers/servers.component';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { ComponentBindingComponent } from './component-binding/component-binding.component';

@NgModule({
  declarations: [AppComponent, ServersComponent, LifeCycleComponent, ComponentBindingComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
