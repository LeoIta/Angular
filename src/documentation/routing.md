# Routing

When you create a new project using the terminal command `ng new myProject`, it start asking you

```
Would you like to add Angular routing? (y/N)
```

If you select yes, it will generate for you, in the `src/app` folder, a file called `app-routing.module`, that could be used to manage the routing in your app.

In case you select no, when you want to manage the routing, you need to create your `app-routing.module.ts` file running:

```
ng generate module app-routing --flat --module=app
```

or the short version

```
ng g m app-routing --flat --module=app
```

`--flat` means that Angular will not generate it in a dedicated folder
`--module=app` specifies in which module Angular should import it (app means in the main `app.module.ts`)

## app-routing.module

In the previous section has been mentioned that you need to generate the `app-routing.module.ts` file. Actually managing the routing in a dedicated module is the best solution, but you can manage routing also directly in the `AppModule` class (`app.module.ts`)

If you want to manage the routing in `app-routing.module.ts`, file will have the following structure:

```
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

The class is annotated with the `@NgModule()` decorator that has as argument an object with two properties:

1. `imports` => accepts an Array but you have inside just the `RouterModule`, that is the module that Angular uses to manage the routing. The method `forRoot` defines which routing should be managed, in this case `routes`
2. `export` => is used to make this routing available in all the application

You have to define a constant `routes: Route` that is an Array of objects, and add to the imports of `app.module.ts` the `AppRoutingModule`.

If you define the routing directly in the `app.module.ts`, without having a dedicated module for it, you have to do just two steps:

1. create the constant `const routes: Routes = [];`
2. add to `imports` in `app.module.ts` the `RouterModule.forRoot(routes)`

This `routes` will be use:

1. [to display components in basic views](#how-to-set-basic-routing) (e.g. `http://localhost:4200/contacts`)
2. [to map routing of components using parameters](#how-to-redirect-to-a-new-view-with-parameters-and-how-to-retrieve-them) (e.g. `http://localhost:4200/about/Paris/France`)
3. [to map routing of components using query parameters and fragments](#how-to-redirect-to-a-new-view-with-query-parameters-and-fragments) (e.g. `http://localhost:4200/about?allowEdit=1#loading`)
4. [to display child (nested) components in the views](#how-to-set-routing-for-child) (e.g. `http://localhost:4200/about`)
5. [to map redirection](#routing-redirection-and-error-page) (e.g. when `http://localhost:4200/xxxxx` then redirect to the homepage)
6. to guard the navigate into the view (e.g. you can access `http://localhost:4200/about` only if you have some rights)
7. to guard the navigate away from the view (e.g. ask confirmation before changing pages, to avoid data change losses)
8. to pass static or dynamic data to the views using `resolver`

## How to set basic routing

In order to set basic routing for some views, you need to add as argument of `const routes: Routes = [];` one object, for each routing, with parameters:

- `path` to define the URL to be display conntected with the component define in the next property
- `component` to define which view (component) to display for that particular URL (`path`)

```
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
];
```

To _activate the routing_ inside the component, you need to add the special element `<router-outlet></router-outlet>`, where you want to have the routing, and remove all the component involved in the routing.

**Please note** that the path for `http://localhost:4200/about` is `'about'` and not `'/about'` or `'\about'` or the app will not display any view.

Now changing URL manually, you can see that:

- `http://localhost:4200` or `http://localhost:4200/` will show only `HomeComponent`
- `http://localhost:4200/about`will show only `AboutComponent`
- `http://localhost:4200/contacts`will show only `ContactsComponent`

The problem is that every time you change manually the URL, the page is reloaded, but it is not the aim of using routing. Let's see how to redirect to a new view (new virtual page) without reloading the page.

## How to redirect to a new view (new virtual page)

To redirect to another view you can use:

1. [links](#redirect-to-a-new-view-using-links) => you have to replace `href` with `routerLink`, as href will redirect to the requested view, but it will reload the page, that is not what you want to achieve with routing
2. [methods](#redirect-to-a-new-view-using-methods) => called in buttons, after click event, will use the `Router`.

### Redirect to a new view using links

Let's assume you are running app locally on port 4200, the host is localhost:4200
Redirect to a new view using links can be done using the Angular directive `routerLink`.

1. `routingLink="path"`
2. `[routingLink]="path"` or `[routingLink]="[path]"`
3. `[routingLink]="[path1,path2,..]"`

where the `path` can be:

- `relative path` (e.g. `'contacts'`,`'./contacts'`, `'../contacts'`,`'../../contacts'`) **appends new path** to your current path, so it returns different results based on the view that contain this rouingLinks
- `absolute path` (e.g. `'/contacts'`)

To understand the difference let's see some examples:

from `http://localhost:4200`, the root path or home page, using:

- `relative path` like e.g `'contacts'` or `'./contacts'` you'll be redirected to `http://localhost:4200/contacts`
- `absolute path` like e.g. `'/contacts'` you'll be redirected to `http://localhost:4200/contacts`
  There is no difference because absolute path is like relative path to the root path `http://localhost:4200`

from `http://localhost:4200/about`, or any other path, using:

- `relative path` like e.g `'contacts'` or `'./contacts'` you'll be redirected to `http://localhost:4200/about/contacts`
- `absolute path` like e.g. `'/contacts'` you'll be redirected to `http://localhost:4200/contacts`
  In this case there is a lot of difference, as you have:
- `relative path` append the path to the current path `'http://localhost:4200/about'` + `'/contacts'` => `http://localhost:4200/about/contacts`
- `absolute path` append the path to the root path `'http://localhost:4200'` + `'/contacts'` => `http://localhost:4200/contacts`

## Append class using RouterLinkActive and RouterLinkActiveOptions

Angular provides a directive to style the `active router link` using the directive `routerLinkActive`that will append a class if the link is part of the active path. (e.g. `routerLinkActive="myClass"`).

By default root path will be always included as part of any path, to specify that you want to consider only the `full match` instead of the `contains match`, you should use another directive called `routerLinkActiveOptions`, as property binding with an object as data

```
<a routerLink="/"
  routerLinkActive="selected"
  [routerLinkActiveOptions]="{exact:true}"
  style="padding: 10px;">
Home
</a>
```

### Redirect to a new view using methods

Let's take as example a button inside `about` component that will redirect to `contacts`view. Steps to obtain it are:

1. add a button in the about template that on click event calls a method (e.g. goToContacts())
2. inject in the constructor the `router: Router`
3. use in the method the `navigate` method of the `router: Router` that accept as argument an Array of paths:

   ```
   goToContacts() {
       this.router.navigate([path]);
     }
   ```

In this case, both relative or absolute paths, will append the path(s) to the root path (`http://localhost:4200`) as the component does not know in which path the component is when the method is called.

In order to inform the component on the current path, you have to add an object as second argument of the navigate method. The object has only one property, called `relativeTo` with value of the property `route`, injected in the constructor, of type `ActivatedRoute` like below:

```
constructor(private router: Router, private route: ActivatedRoute) {}
this.router.navigate(['about'], { relativeTo: this.route });
```

If this method is inside the `AboutComponent`, with path `http://localhost:4200/about`, Angular will append the relative path `'about'` to the `relativeTo path` that will be set to `http://localhost:4200/about`, then the full link will be `http://localhost:4200/about/about`.

## How to redirect to a new view with parameters and how to retrieve them

You could want to map a component or part of it to a path that contains also parameters, like id.

In this case you should add to the list under routes, the path and a `:` followed by the parameter name, like:

```
  { path: 'about/:city/:country', component: RoutingAboutComponent },
```

The above line means that when you have an URL that after `about` has two values, you will have that 1st value will be assigned to the property called `city` and the second to `country`. \
E.g. writing url `http://localhost:4200/about/Paris/France`, Angular will understand:

- country = 'France'
- city = 'Paris'

You can retrieve these properties in two main ways using the `route:ActivatedRoute`:

1. `static`, needed if you do not change them from the same view
2. `dinamic`, if you plan to change them from the same view

To retrieve in the static way, e.g. the parameter `country`, you have to use the `snapshot` follow by the `params`, that contains all the parameters of the current path:
`this.country = this.route.snapshot.params['country']`

To retrieve in the dinamic way, e.g. the parameter `city`, you have to use directly the `params`, that contains all the parameters of the current path, and subscribe it:

```
this.route.params
  .subscribe((params:Params) => this.city = param['city'])
```

This will update the value of city when it changes in the path.

To navigate to e.g. `http://localhost:4200/about/Paris/France`, you use the `navigate` method of the `router: Router` in the ts file:

```
this.router.navigate(['about', 'Paris', 'France'])
```

or the routeLink in the HTML template:

```
[routerLink] = ['about', 'Paris', 'France']
```

## How to redirect to a new view with query parameters and fragments

You could want to map a component or part of it to a path that contains also `query parameters` and `fragments`, like:

```
 http://localhost:4200/about?logged=true&role=admin#user
```

Angular will understand:

- `queryParameters` = { logged: false, role: 'admin' }
- `fragment` = 'user'

You can retrieve these properties in two main ways using the `route:ActivatedRoute`:

1. `static`, needed if you do not change them from the same view
2. `dinamic`, if you plan to change them from the same view

To retrieve in the static way, e.g. the query parameters `logged` and `role`, you have to use the `snapshot` follow by the `queryParams`, that contains all the `query parameters` of the current path:

```
this.logged = this.route.snapshot.queryParams['logged']
this.role = this.route.snapshot.queryParams['role']
```

To retrieve in the static way, the value of the `fragment`, that must be unique, you have to use the `snapshot` follow by the `fragment`, that contains the value of the `fragment` of the current path:

```
this.userType = this.route.snapshot.fragment
```

To retrieve in the dinamic way, e.g. the query parameters `logged` and `role`, you have to use directly the `queryParams`, that contains all the parameters of the current path, and subscribe it:

```
this.route.queryParams
  .subscribe((queryParams:Params) =>
  this.logged = param['logged'];
  this.role = param['role'];
  )
```

To retrieve in the dinamic way, the value of the `fragment`, you have to use directly the `fragment`, that contains the value of the `fragment` of the current path, and subscribe it:

```
this.route.queryParams
  .subscribe((fragment:any) =>
  this.userType = fragment;
  )
```

This will update the value of `logged`, `role` and `userType` when they change in the path.

To navigate to e.g. `http://localhost:4200/about?logged=true&role=admin#user`, you use:

- in the ts file, the `navigate` method of the `router:Router` and as arguments you add:

  1. path (e.g. `['/about']`)
  2. object that contains `queryParams` (e.g. `queryParams: { logged: false, role: 'admin' }`) and `fragment` (e.g. `fragment: 'user'`)

  ```
  this.router.navigate(['/about'], {
        queryParams: { logged: false, role: 'admin' },
        fragment: 'user',
      });
  ```

- in the HTML template, the `routerLink` with `queryParams` and `fragment`:
  ```
  [routerLink]="['/about']"
  [queryParams]="{'logged':true, 'role':'admin'}"
  fragment="user"
  ```

**Please note** that when you route to another view, by default you loss your `query params` and `fragments`. You can decide if keep them or not, setting a properties `queryParamsHandling` and `preserveFragment`.

For `query params` you can set to `merge` or `preserve` the property `queryParamsHandling`:

- `queryParamsHandling='merge'` will keep all the existing params and add/update the one you mention in the property `[queryParams]={key:value}`
- `queryParamsHandling='preserve'`will keep all the existing params without adding or updating any

For `fragments` you can set to `true` or `false` the property `preserveFragment`:

- `preserveFragment=false` will not keep the current fragment and will update it with a new value if any fragment definition is provided
- `preserveFragment=false` will keep the fragment and will not update it even if a new value is provided

If used with `routerLink` you can use them like below:

```
<button
      [routerLink]="[]"
      [queryParams]="{'logged':false}"
      queryParamsHandling='merge'
      fragment="user"
      preserveFragment="false">
Logout
</button>
```

If used with `navigate()` method, you can use them like below:

```
login() {
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { logged: true },
    queryParamsHandling: 'merge',
    preserveFragment: true,
  });
}
```

## How to set routing for child

In order to set routing for a child component/view, you need to add to the parent routing a property calles `children` and value a list of objects, one for each routing, with parameters:

- `path` to define the URL to be display conntected with the component define in the next property
- `component` to define which view (component) to display for that particular URL (`path`)

```
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users', component: UsersComponent, children:[
    {path: ':id', component: UserComponent},
  ] },
];
```

To _activate the routing_ of the children inside the component, you need to add the special element `<router-outlet></router-outlet>`, where you want to have the routing, and remove all the component involved in the routing.

**Please note** that the path for `http://localhost:4200/users/:id` is just `':id'` because child will inherit the path from its parent.

To redirect to a new view (new virtual page) without reloading the page, as the simple routing you'll do the same as described in the [routing redirection session](#how-to-redirect-to-a-new-view-new-virtual-page).

## Routing redirection and error page

Sometimes you want to redirect a path to another one, like e.g. when no path is set, you wnat to be redirected to the home page. In this case you have to use as second property after the path the `redirectTo:` instead of `component`:

```
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: RoutingHomeComponent },
```

In this previous example if you are in `http://localhost:4200/` or `http://localhost:4200/home` you'll be always redirect to `http://localhost:4200/home` and then to the view of `RoutingHomeComponent`

**Please note** that by default, Angular matches paths by prefix so the path `''` will match both paths `''` and `'/something'` and will always redirect you. \
To avoid this error, you MUST set the matching strategy to exact match using `pathMatch: 'full'`; in this way you'll be redirect only for `''`

You would like to display an error page if user enter an invalid path, in this case you'll create an error page and you'll redirect all the invalid page, not mapped in the routing, to the error page:

```
  { path: 'error', component: NotFoundComponent, },
  { path: '**', redirectTo: 'error', },
```

In the above example, you have created a Not Found error page, and you redirect any not mapped view to this error view.

To indicate in only one path all the others, you have to use the wildcard `'**'`.

**Please note** that the wildcard should be used at the end of the route configuration, or all the routing after it, will be ignored.
