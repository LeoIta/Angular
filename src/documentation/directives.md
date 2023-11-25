# Directives

`Directives` are classes that add behavior to the elements.

There are two main categories:

1. [`attribute directives`](#attribute-directives) (e.g. the build-in are `ngClass`, `ngStyle`, `ngModel`) modify the behavior or the appareance of an element, changing e.g. style
2. [`structural directives`](#structural-directives) (e.g. the build-in are `*ngIf`, `ng-template`, `*ngFor`, `ngSwitch`, `*ngSwitchCase`) change the DOM adding/removing elements.

You'll see later how you can create custom directives:

1. [How to create a custom attribute directive](#how-to-create-a-custom-attribute-directive)
2. [How to create a custom structural directive](#how-to-create-a-custom-structural-directive)

## Attribute directives

`Attribute directives` modify the behavior or the appareance of an element, changing e.g. style.

Here below you'll see:

1. [`ngModel`](#ngmodel)
2. [`ngStyle`](#ngStyle)
3. [`ngClass`](#ngclass)

You can use multiple `attribute directives` in the same HTML element.

### ngModel

You have already see the use of the `ngModel` in the [`two-way-binding`](./data-binding.md#two-way-binding).

### ngStyle

To use ngStyle you should use the `property binding` where the `data` is an object that contains the different styles' properties you want to apply, e.g. `[ngStyle]={'color'='red'}` The object will contains pairs of key/value

```
[ngStyle] = {'property 1':'value 1', 'property 2':'value 2'}
```

where `keys` are the CSS properties and `values` are the properties value.

The CSS properties can be written:

- between quotes using standard property name, e.g.`'background-color'`
- without quotes using the CamelCase version of property name, e.g. `backgroundColor`.

The properties value can be:

- static value, e.g. `'background-color':'red'`,
- dinamic value equal to a property defined in the ts file, e.g. `'background-color':color`
- dinamic value coming from a method defined in the ts file, e.g. `'background-color':getColor()`
- dinamic value coming from an expression, e.g. `'background-color': alert?'white':'black'`

Example of the above options are showed inside `ng-style.component.html`:

```
<p [ngStyle]="{backgroundColor:getColor(),color:alert?'white':'black'}">ngStyle</p>
<p [ngStyle]="{'background-color':getColor(),'color':alert?'white':'black'}">ngStyle</p>
```

### ngClass

When you need to set too many properties with `ngStyle`, you can create in css `class selector`, to set all of them, and you can assign the class to the element.
To do that you can use `ngClass` that use the `property binding`:
`[ngClass]="data"`.

The data can be:

1. a class name (e.g. `"'default'"`)
2. a variable storing the class name (e.g. `"className"`)
3. a method that return a class name (e.g. `"getClass()"`)
4. any code that return a class name (e.g. `"alert ? 'alert' : 'default'"`)
5. an array to return multiple values (e.g. `"[getClass(), timer>9?'bigger':'']"`)

## Structural directives

`Structural directives` change the DOM adding removing elements. Usually their name started with a `*` to indicate that is a structural directive.

<p style="background-color:#f8d7da;color:#721c24;">
 You can use the build-in directives or you can build your own, but you cannot have two structural directives in the same element.</p>

Here you'll see:

1. [`*ngIf`](#ngif-else-then)
2. [`ngSwitch` and `*ngSwitchCase`](#ngswitch-and-ngswitchcase)
3. [`*ngFor`](#ngfor)

### \*ngIf, else, then

The `*ngIf` is a `structural directive` used to create or destroy an HTML element.
It can be used alone or with `then` and `else`.

Syntax to add in the HTML element opening tag could be:

1. `*ngIf="condition"` where `condition` can be:
   - a boolean variable (e.g. `active`)
   - a boolean method (e.g. `isActive()`)
   - a boolean result of a statement (e.g. `3>2`)

<p style="background-color:#f8d7da;color:#721c24;">Use of methods in the HTML template with structural, is not recommendated as it will call continously by the component (in the example you can check how many times method is called in the console)</p>

2. `*ngIf="condition; else template1"` where `condition` can be anything as at point 1, and `template1` is the reference name of a `ng-template` element, like in the below example:

```
<p *ngIf="actived; else option2">Is active</p>
<ng-template #option2>
  <p>Is not active</p>
</ng-template>
```

3. `*ngIf="condition; then template1 else template2"` where `condition` can be anything as at point 1, `template1` and `template2` are reference names of a `ng-template` elements, like in the below example:

   ```
   <ng-template *ngIf="actived; then option1 else option2"></ng-template>
   <ng-template #option1>
     <p>Is active</p>
   </ng-template>
   <ng-template #option2>
     <p>Is not active</p>
   </ng-template>
   ```

in this last example you can notice that the `structural directive` is itself inside an `ng-template` element as both `if` and `else` condition will create or destroy HTML `ng-template`.

### ngSwitch and \*ngSwitchCase

With the `if/else` you can cover only two cases (eg. true/false) , if you need to cover multiple cases, then, instead of using multiple `*ngIf/else` you can use one `ngSwitch` with multiple `*ngSwitchCase`.

The syntax is:

```
<div [ngSwitch]="number">
  <p *ngSwitchCase="value1">1</p>
  ...
  <p *ngSwitchCase="valueN">N</p>
  <p *ngSwitchDefault>Unknown number</p>
</div>
```

You use `property binding` (e.g. `[ngSwitch]="number"`) to retrieve the `variable` to be checked. \
Each `*ngSwitchCase` will cover a possible value of the variable under testing. \
All other possible values, not covered by any `*ngSwitchCase`, can be included under `*ngSwitchDefault`.

### \*ngFor

The directive `*ngFor` allows you repeat a template for each element of an array with just few line of code.

If in the `ts` file you define an array:
`numbers = [1, 2, 3, 4, 5, 6, 7]`

You can display all the elements of `numbers`, just using:

```
<p *ngFor="let number of numbers">
  {{number}}
</p>
```

You can do the same also with any type of array.

The \*ngFor give you also possibility to extract other info from the loop:

```
*ngFor="let letter of letters; index as i, count as total, first as firstL, last as lastL, even as isEven, odd as isOdd"
```

The possible parameters are:

1. `index` is a number indicating the index of the element
2. `count` is an number indicating the size of the array
3. `first` is a boolean indicating if the element is the first in the array
4. `last` is a boolean indicating if the element is the last in the array
5. `even` is a boolean indicating if the index is even
6. `odd` is a boolean indicating if the index is odd

You can add alias for any of the above 5, using the key word `as`(e.g. `count as total`).

## Create directives

New `directive` can be generated automatically or manually. To create automatically a directive called `highlight`, you can run `ng generate directive highlight` or the short command `ng g c highlight`
The command:

1. generates a file called `highlight.directive.ts` (containing the logic)
2. generates a file called `highlight.directive.spec.ts` (file to test the ts logic)
3. updates `app.module.ts`, adding in declaration the new directive class
   `declarations: [AppComponent, HighlightDirective],` in order to be able to use it

If you are still not interested in testing, you can skip the creation of the `.spec.ts` file, adding `--skip-tests true` at the end of you command line:
`ng g c highlight --skip-tests true`

If you want to create manually a directive called `highlight`, you should create a file and naming it following the standard `highlight.directive.ts`, and it should have the basic content:

```
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective{
}
```

To indicate that the class is a `directive`, you should add the decorator `@Directive()` taht accept as argument the `selector` that must be a string. Standard for it is a name, between square brackets, that start with app and then the name of the directive. (e.g. `'[appHighlight]'`).

To apply the directive to an HTML element, it is enough to write the selector in the opening tag of the HTML element:

```
<p appHighlight>Content to be highlighted</p>
```

Let's see how to write:

1. [custom attribute directive](#create-a-custom-attribute-directive)
2. [custom structure directive](#create-a-custom-strucutre-directive)

### Create a custom attribute directive

In order to act as an attribute directive, your directive should be able to read/write the properties of the element it is applied to.
There are three ways:

1. using [`ElementRef`](#elementref)
2. using [`ElementRef` and `Renderer2`](#elementref-and-renderer2)
3. using [`@HostBinding()`](#hostbinding)

In order to `capture the events` of the HTML element, you can apply the `@HostListener()` decorator to a method, and put as argument the string name of the Angular event (e.g. `@HostListener('mouseenter')`).

#### ElementRef

Using `ElementRef` you have to define a variable in the constructor:

```
constructor(private element : ElementRef){

}
```

The `element` is the variable used to create a connection with the HTML element to which you want to apply the directive.

To edit properties of the element you can use `element.nativeElement` followed by the property you wnat to access, e.g. to change style and background-color you have to write:

```
this.element.nativeElement.style.backgroundColor = color;
```

where `color` can be a string or a variable, maybe obtained by using `@Input()`.

#### ElementRef and Renderer2

You can access the element with `ElementRef` and edit its properties with `Renderer2`.

In this case the contructor will have two arguments:

```
constructor(private element : ElementRef,, private renderer: Renderer2){

}
```

To edit properties of the element here you use `element.nativeElement` followed by the property you wnat to access, e.g. to change style and background-color you have to write:

```
this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      color
    );
```

where `color` can be a string or a variable, maybe obtained by using `@Input()`.

You can read more about use of `Renderer2` in [Angular doc](https://angular.io/api/core/Renderer2)

#### HostBinding

Adding `HostBinding()` decorator to a variable, you can read and edit the properties of the HTML element without having a custom constructor. The argument of `HostBinding()` is the DOM property we want to change, e.g. `'style.backgroundColor'`, and the property's value will be the value assigned to that property.

```
  @HostBinding('style.backgroundColor') bgColor: string = color;
```

where `color` can be a string or a variable, maybe obtained by using `@Input()`.

### Create a custom structure directive

Before creating a new one, let's see what happens behind the scene, when you use `structural directive` starting with `*`.
Let's see one simple `*ngIf` block and what actually Angular use:

```
<div *ngIf="number>=0">
You have a positive number
</div>
```

```
<ng-template [ngIf]="number>=0">
You have a positive number
</ng-template>
```

As you can see, the `*` indicate that you'll have a property binding that will render a template (`ng-template`).

Based on the above analysis you can create a custom `structural directive` similar to `*ngIf`.

You need to have a constructor with two arguments:

1. `templateRef: TemplateRef<any>` indicates `WHAT` to show/hide
2. `viewContainerRef: ViewContainerRef` indicates `WHERE` to show/hide the template

You need to use the `@Input()`, followed by the key word `set` so update te value everytime the binding value changes. `appUnless` will be a method that accept a boolean `condition` as argument.

```
@Input() set appUnless(condition: boolean) {
   if (!condition) {
     this.viewContainerRef.createEmbeddedView(this.templateRef);
   } else {
     this.viewContainerRef.clear();
   }
 }
```

To initialize an templateRef element in the DOM you'll use:

```
viewContainerRef.createEmbeddedView(this.templateRef)
```

To destroy the element you'll use:

```
viewContainerRef.clear()
```

**Please note** that the name after the `@Input()` decorator MUST match the `directive's selector`

To apply this directive to an HTML element, it is enough to write the selector name preceded by `*` in the opening tag of the HTML element:

```
<li *appUnless="number%2==1">
```
