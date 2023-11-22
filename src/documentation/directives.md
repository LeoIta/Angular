# Directives

`Directives` are classes that add behavior to the elements.

There are two main categories:

1. [`attribute directives`](#attribute-directives) (e.g. `ngClass`, `ngStyle`, `ngModel`) modify the behavior or the appareance of an element, changing e.g. style
2. `structural directives` (e.g. `*ngIf`, `ng-template`, `*ngFor`, `ngSwitch`, `*ngSwitchCase`) change the DOM adding/removing elements.

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
