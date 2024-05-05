# Angular Modules

Angular modules are containers for a particular block of code that adheres to the same functionality.

Angular analyzes modules to understand your application and functionalities.

Angular modules define all building blocks your app uses (Components, Directive, Services).

You can't use a feature or building a block without including it in a module.

A typical Angular application contains at least one main module called `AppModule` that is defined in the `app.module.ts`.

AppModule can be split into multiple modules, one for each feature.

Let's in details:

- [AppModule](#appmodule)
- [Split AppModule in multiple modules](#split-appmodule-in-multiple-modules)
- [Type of modules based on the type of feature they represent](#type-of-modules-based-on-the-type-of-feature-they-represent)
- [Type of modules based on how Angular framework loads them](#type-of-modules-based-on-how-angular-framework-loads-them)
- [Lazy loading](#lazy-loading)

## AppModule

A basic `AppModule` is defined in a file called `app.module.ts` and its structure is as below:

```
@NgModule({
  declaration: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers:[],
  bootstrap:[AppComponent]
})
export class AppModule
```

`NgModule` is an Angular decorator used to configure an `Angular module`.
It accepts an object as a parameter with the following properties:

- `declaration` &rarr; array that contains the declaration of Angular artifacts: `components`, `directives` and `pipes`.
- `imports` &rarr; array that contains other Angular modules whose declarations are needed by the current module
- `providers` &rarr; array that contains `services`
- `bootstrap` &rarr; array that defines the component that will be loaded at application startup (`AppComponent`). It is set only once in the main application module and it is usually the main component.

The purpose of the main application module is to orchestrate the interaction of feature modules throughout the application and is not tied to a specific feature.

In addition to the main application module, you can create other Angular modules to help you organize your application.

## Split AppModule in multiple modules

In order to better understand how modules work, and their type, let's start from a project that has only one module, the `AppModule`, that contains all the artifacts needed for the different app features, included the routing.

Having everything in one module makes your implementation hard to read and maintain.

Let's see the possible split you can do to improve the code in your <a href="https://github.com/LeoIta/Modules/blob/step_0/src/app/app.module.ts" target="_blank">single module</a> application:

- [Step 1 - Extract routing module](#step-1---extract-routing-module)
- [Step 2 - Extract Product feature](#step-2---extract-product-feature)
- [Step 3 - Extract Cart feature](#step-3---extract-cart-feature)
- [Step 4 - Extract Order feature](#step-4---extract-order-feature)
- [Step 5 - Extract Summary and Thank you feature](#step-5---extract-summary-and-thank-you-feature)
- [Step 6 - Splitting routing module by features](#step-6---splitting-the-routing-module-by-features)

### Step 1 - Extract routing module

As first step you can extract the routing part into a separated module, <a href="https://github.com/LeoIta/Angular-Modules/blob/step_1/src/app/app-routing.module.ts" target="_blank">AppRoutingModule</a>.

Besides extracting part of the code from `AppModule` into `AppRoutingModule` two important things MUST be done:

1. in the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_1/src/app/app.module.ts" target="_blank">AppModule</a>, you must import the routing module adding, inside the `NgModel` decorator, the `AppRoutingModule` inside the imports array.
2. in the `NgModel` decorator of `AppRoutingModule`, you must export the `RouterModule` using `exports: [RouterModule]`.

Without point 1, `AppModule` will not know that `AppRoutingModule` exists, and will not be able to use it.

Without point 2, `AppModule` will not be able to use the `RouterModule` functionalities as `AppRoutingModule` is not exposing the `RouterModule` to `AppModule`.

### Step 2 - Extract Product feature

In this step you can extract in a separated module all the artifacts, linked with the product view, grouped in the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_2/src/app/product"  target="_blank">product</a> folder.

Analyzing the product folder, you can see that:

1. the <a href="https://github.com/LeoIta/Modules/blob/step_2/src/app/product/product.component.ts" target="_blank">product component</a> uses the ProductService
2. the <a href="https://github.com/LeoIta/Modules/blob/step_2/src/app/product/product.component.html" target="_blank">product template</a> uses
   `*ngFor`, `*ngIf`, `string interpolation` and `routerLink`.

The productService is injected in `AppModule`:

```
  providers: [ProductService]
```

An instance is created in the `ProductComponent`, then there is nothing to add into the product module:

```
constructor(private productService: ProductService) {}
```

In order to be able to use `*ngFor`, `*ngIf` and `string interpolation` you must add in the imports the `CommonModule`.
In order to be able to use the `routerLink`, you must add in the imports the `RouterModule`.

To expose the used modules to other module, you should use the `exports` property of the `NgModule` decorator.

Only the ProductComponent is in scope of this feature, then the ProductModule must have:

```
declarations: [ProductComponent],
imports: [CommonModule, RouterModule],
exports: [ProductComponent]
```

You can check the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_2/src/app/app.module.ts" target="_blank">AppModule</a> and <a href="https://github.com/LeoIta/Angular-Modules/blob/step_2/src/app/product.module.ts" target="_blank">ProductModule</a> to see how they look after this step of splitting.

### Step 3 - Extract Cart feature

In this step you can extract in a separated module all the artifacts, linked with the cart view, grouped in the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_3/src/app/cart"  target="_blank">product</a> folder.

The folder contains cart and account components:

1. cartComponent uses `*ngFor`, `*ngIf`, `ProductService`, `Router`
2. accountComponent uses `OrderService`, `Router` and `NgForm`

The `CartModule` must have in the `declarations` the two components:

- `cartComponent`
- `accountComponent`

In the `imports` must have:

1. `CommonModule` for `*ngFor`, `*ngIf`
2. `FormsModule` for `NgForm`
3. `RouterModule` for `Router`
4. `OrderService` has the `@Injectable({providedIn: 'root',})` decorator, so no injection needed, you need just to initialize an instance of the service.

You can check the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_3/src/app/app.module.ts" target="_blank">AppModule</a> and <a href="https://github.com/LeoIta/Angular-Modules/blob/step_3/src/app/cart.module.ts" target="_blank">CartModule</a> to see how they look after this step of splitting.

### Step 4 - Extract Order feature

In this step you can extract in a separated module all the artifacts, linked with the order view, grouped in the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_4/src/app/order"  target="_blank">order</a> folder.

The folder contains order and address components:

1. orderComponent uses `ProductService`, `*ngFor`, `*ngIf`, `Router`
2. addressComponent uses `FormGroup`, `OrderService` and `Router`

The `OrderModule` must have in the `declarations` the two components:

- `orderComponent`
- `addressComponent`

In the `imports` must have:

1. `CommonModule` for `*ngFor`, `*ngIf`
2. `ReactiveFormsModule` for `FormGroup`
3. `RouterModule` for `Router`
4. `OrderService` has the `@Injectable({providedIn: 'root',})`
   decorator, so no injection needed, you need just to initialize an instance of the service.
5. `ProductService` is injected in `AppModule`:
   ```
     providers: [ProductService]
   ```

You can check the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_4/src/app/app.module.ts" target="_blank">AppModule</a> and <a href="https://github.com/LeoIta/Angular-Modules/blob/step_4/src/app/order.module.ts" target="_blank">OrderModule</a> to see how they look after this step of splitting.

### Step 5 - Extract Summary and Thank you feature

In this step you can extract in a separated module all the artifacts, linked with the order view, grouped in the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_5/src/app/summary" target="_blank">summary</a> and <a href="https://github.com/LeoIta/Angular-Modules/blob/step_5/src/app/thanks" target="_blank">thanks</a> folders.

The folders contain summary and thanks components:

1. summaryComponent uses `ProductService`, `OrderService`, `Router`, `*ngFor`, `*ngIf`, `Router`
2. thanksComponent uses `Router`

In the `imports` must have:

1. `CommonModule` for `*ngFor`, `*ngIf`
2. `RouterModule` for `Router`
3. `OrderService` has the `@Injectable({providedIn: 'root',})`
   decorator, so no injection needed, you need just to initialize an instance of the service.
4. `ProductService` is injected in `AppModule`:
   ```
     providers: [ProductService]
   ```

You can check:

- the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_5/src/app/app.module.ts" target="_blank">AppModule</a>
- the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_5/src/app/summary.module.ts" target="_blank">SummaryModule</a>
- the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_5/src/app/thanks.module.ts" target="_blank">ThanksModule</a>

to see how they look after this step of splitting.

### Step 6 - Splitting the routing module by features

You have already splitted the `AppModule` in feature modules, now you can split also the `AppRoutingModule` in features `routing modules`.

This split is easier than the one done before.

Here you need to extract the `path` for the specific feature and use that `routes` in the new feature routing module. Only difference with `AppRoutingModule` is that the main routing uses `RouterModule.forRoot(routes)`, but feature routing modules use `RouterModule.forChild(routes)`.

Feature routing modules should use the `exports` property to make available for other modules, that import them, the artifacts added to the exports array.

Feature modules should import their feature routing modules in the `imports` array instead of the `RouterModule` (as mentioned before, each feature routing module exports the RouterModule that is no more needed in the import of the feature modules).

You can check the changes applied for this last split on
<a href="https://github.com/LeoIta/Angular-Modules/commit/453755bfb77127a87f61cded6edfc33e2345957b" target="_blank">this commit</a>.

**Please note** that the wild routing `**` MUST be extracted in a dedicated module, in the example project has been used the <a href="https://github.com/LeoIta/Angular-Modules/blob/step_6/src/app/notFound/notFound-routing.module.ts" target="_blank">NotFoundRoutingModule</a>, or it will affect the routing not present in the main `AppRouting`.

## Type of modules based on the type of feature they represent

You can separate modules according to the feature that they represent:

- `Angular build-in module`: contains functionality of each Angular library that needs to be exposed through an Angular module.
- `Core module` : usually contains components that are loaded once in an application, (header, footer, or a loader spinner). It should be loaded only once in the main application.
- `Shared module`: contains components, directive and pipes that can be used in multiple feature modules.
- `Feature module`: contains components, directive and pipes used for a particular feature (e.g. the previous extracted CartModule, OrderModule, ProductModule, ThanksModule, SummaryModule)

### Angular build-in module

The most widely used modules of the Angular framework are:

- `BrowserModule` &rarr; used to run Angular application in the browser and must be iported only once in an application.
- `CommonModule` &rarr; contains specific Angular artifacts that support the Angular template syntax and enrich your HTML template.
- `FormsModule` / `ReactiveFormsModule` &rarr; allows you to build HTML forms for interaction with user input data
- `HttpClientModule` &rarr; enables communication and data exchange with a remote REST api endpoint over http.
- `RouterModule` &rarr; performs and handles navigation among views using routing.
- `BrowserAnimationModule` &rarr; in collaboration with Angular Material library enables UI animation in an Angular application.

### Importance of exports property

Feature modules can also share their encapsulated functionality wiht other modules.
All components of an Angular module are not exposed to the common Angular framework by default.

To expose a component through the framework, you need to use another property of the decorator, the `exports` array.

When you want to make a component publicly available to other modules that import an existing feature module, we need to add it to the exports array of the module that owns it.

This can be verified in one of the feature modules changed in the session [Step 6 - Splitting the routing module by features](#step-6---splitting-the-routing-module-by-features).

E.g. considering the `OrderModule` and the `OrderRoutingModule` you have replaced in the `imports` array of `OrderModule` the `RouterModule` with `OrderRoutingModule`, keeping the same functionality, only because the `OrderRoutingModule` exposed in `exports` array the `RouterModule`.

If you'll remove in `OrderRoutingModule` the `RouterModule` from the `exports` array, your application will return an error as will not recognize the `RouterLink`.

## Type of modules based on how Angular framework loads them

Based on how Angular framework loads them, there are two categories of modules:

- `Eager-loaded` modules &rarr; loaded at the application startup, they are declared in the imports array of another module.
- `Lazy-loaded` modules &rarr; loaded on-demand, usually due to in-app navigation, they have their specific way of loading, you'll see details in the next session [lazy loading](#lazy-loading).

## Lazy loading

In order to improve performance of Angular projects, it is a good idea:

1. to split the main module in feature modules, as done in the point [Split AppModule in multiple modules](#split-appmodule-in-multiple-modules)
2. to load the modules on-demand, only when and if they are needed.

`Lazy loading` reduce the time it takes for a web page to load, because the browser only loads a part of the content of a page at a time. Process is called lazy because it delays the loading until needed.

To set modules in Angular as `lazy loading`, you need to change the routing modules.

In each feature routing module, the root path should be change to empty path `''`, and in the main routing module, the `AppRoutingModule` you shold map each feature path with the proper feature routing module, using the `loadChildren` property in the routes, as follow:

```
{
  path: 'cart',
  loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
}
```

In this example you put the path of were the module is, and at the end call the module (CartModule in this specific example).

To see more example of lazy configuration, check the <a href="https://github.com/LeoIta/Angular-Modules/commit/510aeea3f54d9cf9f77dd7212b1b62a7433db179" target="_blank">lazy loading commit</a>.
