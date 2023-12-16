import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingHomeComponent } from './routing/routing-home/routing-home.component';
import { RoutingAboutComponent } from './routing/routing-about/routing-about.component';
import { RoutingContactsComponent } from './routing/routing-contacts/routing-contacts.component';
import { RoutingUsersComponent } from './routing/routing-users/routing-users.component';
import { RoutingUserComponent } from './routing/routing-user/routing-user.component';
import { NotFoundComponent } from './routing/not-found/not-found.component';
// import { AboutComponent } from './basic-routing/about/about.component';
// import { ContactsComponent } from './basic-routing/contacts/contacts.component';
// import { HomeComponent } from './basic-routing/home/home.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: RoutingHomeComponent },
  { path: 'about', component: RoutingAboutComponent },
  { path: 'about/:country/:city', component: RoutingAboutComponent },
  { path: 'contacts', component: RoutingContactsComponent },
  { path: 'contacts/:id', component: RoutingContactsComponent },
  {
    path: 'users',
    component: RoutingUsersComponent,
    children: [{ path: ':id', component: RoutingUserComponent }],
  },
  {
    path: 'error',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
