# How pass data among components

It is possible to pass data among components:

1. from parent to child using `@Input()` and `property binding`

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
