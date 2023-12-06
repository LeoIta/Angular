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

## How to set basic routing

In order to set basic routing for some views, we need to add as argument of `const routes: Routes = [];` one object, for each routing, with parameters:

- `path` to define the URL to be display conntected with the component define in the next property
- `component` to define which view (component) to display for that particular URL (`path`)

```
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
];
```

To _activate the routing_ inside the component, you need to add the special element `<router-outlet></router-outlet>`, where you want to have the routing, ad remove all the component involved in the routing.

**Please note** that the path for `http://localhost:4200/about` is `'about'` and not `'/about'` or `'\about'` or the app will not display any view.

Now changing URL manually, we can see that:

- `http://localhost:4200` or `http://localhost:4200/` will show only `HomeComponent`
- `http://localhost:4200/about`will show only `AboutComponent`
- `http://localhost:4200/contacts`will show only `ContactsComponent`

The problem is that every time we change manually the URL, the page is reloaded, but it is not the aim of using routing. Let's see how to redirect to a new view (new virtual page) without reloading the page.
