import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingHomeComponent } from './routing/routing-home/routing-home.component';
import { RoutingAboutComponent } from './routing/routing-about/routing-about.component';
import { RoutingContactsComponent } from './routing/routing-contacts/routing-contacts.component';
import { RoutingUsersComponent } from './routing/routing-users/routing-users.component';
import { RoutingUserComponent } from './routing/routing-user/routing-user.component';
import { NotFoundComponent } from './routing/not-found/not-found.component';
import { authLoggedGuard } from './routing/guards/auth-logged.guard';
import { authAdminGuard } from './routing/guards/auth-admin.guard';
import { UnauthorizedComponent } from './routing/unauthorized/unauthorized.component';
import { authEditGuard } from './routing/guards/auth-edit.guard';
import { matchGuard } from './routing/guards/match.guard';
import { userResolver } from './routing/resolvers/user.resolver';
// import { AboutComponent } from './basic-routing/about/about.component';
// import { ContactsComponent } from './basic-routing/contacts/contacts.component';
// import { HomeComponent } from './basic-routing/home/home.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: RoutingHomeComponent },
  {
    path: 'about',
    component: RoutingAboutComponent,
    canActivate: [authLoggedGuard],
  },
  {
    path: 'about/:country/:city',
    component: RoutingAboutComponent,
    canActivate: [authLoggedGuard],
  },
  {
    path: 'contacts',
    component: RoutingContactsComponent,
    canActivate: [authLoggedGuard],
  },
  {
    path: 'contacts/:id',
    component: RoutingContactsComponent,
    canActivate: [authLoggedGuard],
  },
  {
    path: 'users',
    component: RoutingUsersComponent,
    children: [
      {
        path: ':id',
        component: RoutingUserComponent,
        resolve: { user: userResolver },
        canDeactivate: [authEditGuard],
      },
    ],
    canActivate: [authLoggedGuard],
    canActivateChild: [authAdminGuard],
    canMatch: [matchGuard],
  },
  {
    path: 'error',
    component: NotFoundComponent,
    data: { message: '404 - Page Not Found!' },
  },
  {
    path: '401',
    component: UnauthorizedComponent,
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
