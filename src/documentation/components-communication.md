# How pass data among components

It is possible to pass data among components:

1. from parent to child using [`@Input()`](#input-decorator) and `property binding`
2. from child to parent using [`@Output()`](#ouput-decorator), `EventEmitter()` and `event binding`
3. from HTML elements to component using `variable template`, `#selectorName` [`@ViewChild('selectorName')`](#variable-template-viewchild-and-elementref)
4. from HTML element between the component tags to the component using `element reference` , `#selectorName`, `ng-content` and [`@ContentChild('selectorName')`](#element-reference-ng-content-and-contentchild)

## @Input() decorator

The `@Input()` decorator allows you to map a variable defined in the parent component, with a variable declared with `@Input()` in the child component. \
`@Input()` can be used with or without arguments.

Example:

`parent.component.ts`

```
people = [
  new Person('John', 'User001'),
  new Person('Paul', 'User002'),
  new Person('Tom', 'User003'),
];
```

Using the `@Input()` decorator without arguments, like `@Input() childDataArray`, in `child.component.ts`, you can assign to the variable the value of the parent variable `people`, using in the `parent.component.html` the property binding:

```
<app-child [childDataArray]="people"></app-child>
```

and consume it in the `child.component.html` using:

```
{{childDataArray[0].username}}
```

Using the `@Input()` decorator with arguments, like `@Input('childAnotherArray') childData`, in `child-another.component.ts`, you add an alias to the `childData` variable, and assign to it the value of the parent variable `people`, using in the `parent.component.html` the property binding:

```
<app-child-another [childAnotherArray]="people"></app-child-another>
```

and consume it in the `child-another.component.html` using:

```
{{childData[0].username}}
```

## @Ouput() decorator

The `@Output()` decorator allows you to pass a variable defined in the child component, to his parent, generating a custom event. \
`@Output()` can be used with or without arguments.

Example:

`myparent.component.ts`

```
classInternational: Person[] = [];
onAdd(newClass: Person[]) {
  console.log(this.classInternational);
  this.classInternational = this.classInternational.concat(newClass);
  console.log(this.classInternational);
}
```

`my-first-child.component.ts`

```
@Output() firstClass = new EventEmitter<Person[]>();
classIta = [new Person('Carlo', 'Utente01'), new Person('Paolo', 'Utente02')];
onClick() {
  this.firstClass.emit(this.classIta);
}
```

Using the `@Output()` decorator without arguments, like `@Output() firstClass = new EventEmitter<Person[]>()`, in `my-first-child.component.ts`, you create an event emitter that will be triggered by the method `onClick()` when a button is clicked. This new event will emit an array of Person objects.
It will be consumed by the parent as a classic `event binding` where the event is called as the variable `firstClass`.

`my-second-child.component.ts`

```
@Output('engClass') secondClass = new EventEmitter<Person[]>();
classEng = [new Person('Paul', 'User01'), new Person('Tom', 'User02')];
onClick() {
  this.secondClass.emit(this.classEng);
}
```

Using the `@Output()` decorator with arguments, like `@Output('engClass') secondClass = new EventEmitter<Person[]>()`, in `my-second-child.component.ts`, you create an event emitter that will be triggered by the method `onClick()` when a button is clicked. This new event will emit an array of Person objects.
It will be consumed by the parent as a classic `event binding` where the event is not called as the variable `secondClass`, but as the alias assigned in the `@Output()` decorator, that is , in this case, `engClass`.

`myparent.component.html`

```
<h1>My parent</h1>
<app-my-first-child (firstClass)="onAdd($event)"></app-my-first-child>
<app-my-second-child (engClass)="onAdd($event)"></app-my-second-child>
<div *ngFor="let person of classInternational">
  <li>{{person.username}} with id {{person.userId}}</li>
</div>
```

## Variable template, @ViewChild() and ElementRef

A faster/easier way, comparing with `data binding` to pass data from HTML element inside the component template and the component logic, is the use of `variable template` and `@ViewChild()` decorator.

Let's see one example with an `input` HTML element:

`variable-template.component.html`

```
<input type="text" (input)="onInput()" #inputForm value="default">
{{myInput}}
```

`variable-template.component.ts`

```
myInput = '';
@ViewChild('inputForm') myInputRefElement!: ElementRef<HTMLInputElement>;
  onInput() {
    this.myInput = this.myInputRefElement.nativeElement.value;
  }
```

In order to define a `variable template`, in the component template, you add inside the element a selector, in this case `#inputForm`. \
In order to call that element inside the `variable-template.component.ts`, you have to use the `@ViewChild()` decorator with argument the selector without the `#` sign, like `@ViewChild('inputForm')`.

The variable with the `@ViewChild()` decorator can have a very generic type: \
`@ViewChild('inputForm') myInputRefElement: any;` \
a generic ElementRef type: \
`ElementRef<HTMLInputElement>` \
or a specific ElementRef type for the specific HTML element \
`ElementRef<HTMLInputElement>`

To get the value of your input you'll use `myInputRefElement.nativeElement.value`.

**Please note:**

- if you define type `ElementRef<HTMLInputElement>`, TypeScript will suggest both `native element` and `value`
- if you define type `ElementRef`, TypeScript will suggest `native element` but not `value`
- if you define type `any`, TypeScript will not suggest neither `native element` or `value`

## Element reference, ng-content and @ContentChild()

By default Angular will not consider and show the html between the component tags, e.g. in `main.component.html`

```
<p>main works!</p>
<app-slave>
  <h2>NgContent in main.component.html</h2>
  <input #inputForm>
</app-slave>
```

Angular will ignore the `h1` header and the `input form`.

In order to say to Angular to consider it, you can use a directory called `ng-content` in the component template (`slave.component.html` in this case).

```
<h1>Slave component</h1>
<ng-content></ng-content>
<p>The input value is {{mappedValue}} </p>
```

Now you have a content between the `app-slave` tags that you want to access.

In this case you can use again the `variable reference` `#inputForm` but, as this element is inside the ng-content and not inside the component view, you cannot use `ViewChild` decorator but you have the `ContentChild`, that works exactly as the `ViewChild`.
Let's see the `slave.component.ts`

```
mappedValue = '';
@ContentChild('inputForm') value!: ElementRef<HTMLInputElement>;

ngAfterContentChecked() {
  this.mappedValue = this.value.nativeElement.value;
}
```

In order to use the `#inputForm` variable, you have to use the `@ContentChild()` decorator with argument the selector without the `#` sign, like `@ContentChild('inputForm')`.

The variable with the `@ContentChild()` decorator can have a very generic type: \
`@ViewChild('inputForm') myInputRefElement: any;` \
a generic ElementRef type: \
`ElementRef<HTMLInputElement>` \
or a specific ElementRef type for the specific HTML element \
`ElementRef<HTMLInputElement>`

To get the value of your input you'll use `myInputRefElement.nativeElement.value`.

**Please note:**

- if you define type `ElementRef<HTMLInputElement>`, TypeScript will suggest both `native element` and `value`
- if you define type `ElementRef`, TypeScript will suggest `native element` but not `value`
- if you define type `any`, TypeScript will not suggest neither `native element` or `value`

**Please note:**\
The value coming from the `@ContentChild()` will be visible in the DOM not before the `AfterContentChecked` hook of the component life.
