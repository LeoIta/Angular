# Components

The `*.component.ts file` has a default structure as below:

```
import { Component } from '@angular/core';

@Component({
selector: 'app-servers',
templateUrl: './servers.component.html',
styleUrls: ['./servers.component.css'],
})
export class ServersComponent {}
```

If you create it manually, you could add in the `@Component({})` decorator the following:

- `selector`, as the name suggest will be the CSS selector that identifies this directive in a template and triggers instantiation of the directive. \
  The standard naming convention it to start with `app-` followed by your component name, but you give any name you want. \
   You can have different selector types and different way to trigger the component:
  - `element selector` _[default selector]_ \
    in `servers.component.css` you define:
    ```
    selector:'app-servers'
    ```
    in html you can use the component with:
    ```
    <app-servers></app-servers>
    ```
  - `attribute selector` \
    in `servers.component.css` you define:
    ```
     selector:'[app-servers]'
    ```
    in html you can use the component with:
    ```
    <div app-servers></div>
    ```
  - `class selector` \
    in `servers.component.css` you define:
    ```
    selector:'.app-servers'
    ```
    in html you can use the component with:
    ```
    <div class="app-servers"></div>
    ```
  - `id selector` is not supported by Angular
- `templateUrl` or `template` MUST be provided

  - `templateUrl` is the relative path or absolute URL of a template file for an Angular component. If provided, do not supply a template file using `template`.
    ```
    templateUrl: './servers.component.html'
    ```
  - `template` is an inline template for an Angular component. If provided, do not supply a template file using `templateUrl`.
    ```
    template: `
        <app-another-component><app-another-component>
        <p>my paragraph</p>
        <app-another-component><app-another-component>`
    ```

- `styleUrls` or `styles`
  - `styleUrls` is a list of the relative paths or absolute URLs for files containing CSS stylesheets to use in this component:
    ```
    styleUrls: [
      './servers.component.css',
      './another.css',
      ]
    ```
  - `styles` contains one or more inline CSS stylesheets to use in this component:
    ```
    styles: [`
      h3 {
        color: blue;
      }
    `]
    ```

## Style Encapsulation (style rules in Angular )

Assuming you have this structure in your project:

```
Angular
  |_ angular.json
  |_ /.angular
  |_ /node_modules
  |_ /src
        |_ /app
            |_ app.component.css
            |_ app.component.html
            |_ /servers
                |_ servers.component.css
                |_ servers.component.html
        |_  /assets
        |_  styles.css
```

If you want to use another style.css prior the `style.css` file you should go inside the `angular.json` file that has a json structure like:

```
angular.json >
   {} project >
     {} Angular >
      {} architect >
        {} build >
          {} options >
            [] styles  `
```

where you'll find:

```
"styles": [
              "src/styles.css"
],
```

here you can add before` "src/styles.css"` another style.css file, for example you can install `Bootstrap` running in terminal `npm install --save bootstrap` and then you can add it there:

```
"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css"
              "src/styles.css"
],
```

and you can then use `Bootstrap` in your project.

By default the main style file is `style.css` that will be applied to both:

- `app.component.html`
- `servers.component.html`

You can override `style.css` in:

- `app.component.css` for `app.component.hmtl`
- `servers.component.css` for `servers.component.hmtl`
- style written in `app.component.css` will not be inherited by `servers.component.hmtl`

To control this style behaviour, called `encapsulation policy`, you can define inside your Component decorator the `encapsulation` property.\
Possible values are:

- `ViewEncapsulation.Emulated`_[default value]_ : Apply modified component styles in order to emulate a native Shadow DOM CSS encapsulation behavior.
- `ViewEncapsulation.None`: Apply component styles globally without any sort of encapsulation. _[setting this, for example in `servers.component.ts`, will apply the style defined in `servers.component.css` to all the components]_
- `ViewEncapsulation.ShadowDom`: Use the browser's native Shadow DOM API to encapsulate styles. _[similar to `Emulated` but `Shadow DOM API` could not be supported by some browsers]_

Full documentation of Component decorator can be found on [Angular documentation](https://angular.io/api/core/Component)

## Component life

Read about it in [component-life.md](./component-life.md) or on [Angular documentation](https://angular.io/guide/lifecycle-hooks)

## How pass data among components

Read about it in [components-communication.md](./components-communication.md)
