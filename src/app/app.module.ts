import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { MyparentComponent } from './data-among-components/data-child-to-parent/myparent/myparent.component';
import { MyFirstChildComponent } from './data-among-components/data-child-to-parent/my-first-child/my-first-child.component';
import { MySecondChildComponent } from './data-among-components/data-child-to-parent/my-second-child/my-second-child.component';
import { VariableTemplateComponent } from './data-among-components/variable-template/variable-template.component';
import { MainComponent } from './data-among-components/ng-content/main/main.component';
import { SlaveComponent } from './data-among-components/ng-content/slave/slave.component';
import { NgStyleComponent } from './directives/ng-style/ng-style.component';
import { NgClassComponent } from './directives/ng-class/ng-class.component';
import { NgIfComponent } from './directives/ng-if/ng-if.component';
import { NgSwitchComponent } from './directives/ng-switch/ng-switch.component';
import { NgForComponent } from './directives/ng-for/ng-for.component';
import { HighlightDirective } from './directives/custom-attribute-directive/highlight.directive';
import { AttributeDirectiveComponent } from './directives/custom-attribute-directive/attribute-directive.component';
import { SimpleAttributeComponent } from './directives/custom-attribute-directive/simple-attribute/simple-attribute.component';
import { AdvanceAttributeComponent } from './directives/custom-attribute-directive/advance-attribute/advance-attribute.component';
import { DynamicHighlightDirective } from './directives/custom-attribute-directive/dynamic-highlight.directive';
import { RendererAttributeComponent } from './directives/custom-attribute-directive/renderer-attribute/renderer-attribute.component';
import { AdvancedHighlightDirective } from './directives/custom-attribute-directive/advanced-highlight.directive';
import { UnlessDirective } from './directives/custom-structure-directive/unless.directive';
import { StructureDirectiveComponent } from './directives/custom-structure-directive/structure-directive.component';
import { ApplicationComponent } from './application-using-services/application.component';
import { SubAppAComponent } from './application-using-services/sub-app-a/sub-app-a.component';
import { SubAppBComponent } from './application-using-services/sub-app-b/sub-app-b.component';
import { MainService } from './application-using-services/main.service';
import { HomeComponent } from './basic-routing/home/home.component';
import { AboutComponent } from './basic-routing/about/about.component';
import { ContactsComponent } from './basic-routing/contacts/contacts.component';
import { BasicRoutingComponent } from './basic-routing/basic-routing.component';
import { RoutingComponent } from './routing/routing.component';
import { RoutingHomeComponent } from './routing/routing-home/routing-home.component';
import { RoutingAboutComponent } from './routing/routing-about/routing-about.component';
import { RoutingContactsComponent } from './routing/routing-contacts/routing-contacts.component';
import { RoutingUsersComponent } from './routing/routing-users/routing-users.component';
import { RoutingUserComponent } from './routing/routing-user/routing-user.component';
import { NotFoundComponent } from './routing/not-found/not-found.component';
import { UnauthorizedComponent } from './routing/unauthorized/unauthorized.component';
import { TdTemplateComponent } from './forms/td-template/td-template.component';
import { BasicFormComponent } from './forms/td-template/basic-form.component';
import { BasicNgFormComponent } from './forms/td-template/basic-ngForm.component';
import { BasicControlNgModelComponent } from './forms/td-template/basic-control-ngModel.component';
import { BasicValidatorsComponent } from './forms/td-template/basic-validators.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { PipeComponent } from './pipes/pipe/pipe.component';
import { DoublePipe } from './pipes/double.pipe';
import { SubStringPipe } from './pipes/substring.pipe';
import { OptsubstringPipe } from './pipes/optsubstring.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterPipeComponent } from './pipes/filter-pipe/filter-pipe.component';
import { SortPipe } from './pipes/sort.pipe';
import { HttpComponent } from './http/http.component';
import { ManageUsersComponent } from './http/manage-users/manage-users.component';
import { AuthInterceptor } from './http/auth.interceptor';
import { ResponseInterceptor } from './http/response.interceptor';
import { AuthorizationComponent } from './authorization/authorization.component';
import { LoginComponent } from './authorization/login/login.component';
import { TeamComponent } from './authorization/team/team.component';
import { PageComponent } from './component-programmatically-creation/page/page.component';
import { AlertComponent } from './component-programmatically-creation/alert/alert.component';
import { PositionDirective } from './component-programmatically-creation/position.directive';

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
    MyparentComponent,
    MyFirstChildComponent,
    MySecondChildComponent,
    VariableTemplateComponent,
    MainComponent,
    SlaveComponent,
    NgStyleComponent,
    NgClassComponent,
    NgIfComponent,
    NgSwitchComponent,
    NgForComponent,
    HighlightDirective,
    DynamicHighlightDirective,
    AdvancedHighlightDirective,
    AttributeDirectiveComponent,
    SimpleAttributeComponent,
    AdvanceAttributeComponent,
    RendererAttributeComponent,
    UnlessDirective,
    StructureDirectiveComponent,
    ApplicationComponent,
    SubAppAComponent,
    SubAppBComponent,
    HomeComponent,
    AboutComponent,
    ContactsComponent,
    BasicRoutingComponent,
    RoutingComponent,
    RoutingHomeComponent,
    RoutingAboutComponent,
    RoutingContactsComponent,
    RoutingUsersComponent,
    RoutingUserComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    TdTemplateComponent,
    BasicFormComponent,
    BasicNgFormComponent,
    BasicControlNgModelComponent,
    BasicValidatorsComponent,
    ReactiveFormComponent,
    PipeComponent,
    DoublePipe,
    SubStringPipe,
    OptsubstringPipe,
    FilterPipe,
    FilterPipeComponent,
    SortPipe,
    HttpComponent,
    ManageUsersComponent,
    AuthorizationComponent,
    LoginComponent,
    TeamComponent,
    PageComponent,
    AlertComponent,
    PositionDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    MainService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ResponseInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
