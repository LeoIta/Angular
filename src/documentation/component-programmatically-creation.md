# How to create a component programmatically

Components can be added/removed from the DOM using the structure directive `*ngIf`, however in some cases you would like to do it directly in the code, with the help of one method.

In this case you are `creating/destroying a component programmatically`.

In order to do it, you should follow the following steps:

1. create a directive to detective where you want to place your component in the DOM
2. prepare the component in which you want to insert the component, using the `ng-template`
3. use ViewContainer to create the component
4. send value to the component you want to create (data binding and event binding)

## Step 1 - create directive

You need to create a directive that, when applied to a component, will be able to identify where it is placed inside the DOM.

```
@Directive({
  selector: '[appPosition]',
})
export class PositionDirective {
  constructor(public viewContainer: ViewContainerRef) {}
}
```

Position will be detected through the use of ViewContainerRef.

## Step 2 - prepare receiving component template

In the receiving component you should add an `<ng-template>` element, and apply to it the created directive:

```
<ng-template appPosition></ng-template>
```

In this way you can decide where exactly insert your generated component.

If you do no use an `<ng-template>` element with a dedicate directive, the component will always be added at the end of the receiving component:

```
export class PageComponent {
  constructor(private viewContainer: ViewContainerRef) {}
  ...
  showAlert() {
      const alertComponent = this.viewContainer.createComponent(AlertComponent);
  }
}
```

## Step 3 - create component using ViewContainer and ng-template

If you decide to use the ng-template, instead of inject the viewContainer in the constructor, you have to use the decorator `viewChild`. In this case, instead of assigning a name, as argument of the decorator, you can put the name of the directive applied to the `ng-template`, as it will detect the first element that use that directive.

```
  @ViewChild(PositionDirective)
  dynamicComponent!: PositionDirective;
  showAlert() {
    const viewContainer = this.dynamicComponent.viewContainer;
    viewContainer.clear();
    viewContainer.createComponent(AlertComponent);
  }
```

In the above example you create a variable for the `viewContainer` so that before creating a new instance of the component in the DOM, you clean all the previous content of that specific position.

**please note** that if you skip the `viewContainer.clear();` you will append another copy of the component every time you call the method `showAlert()`.

To add your component (AlertComponent, in this case), you use the `viewContainer.createComponent(AlertComponent);`.

To remove the component, you will use `viewContainer.clear();`.

## Step 4 - data and event binding with ComponentRef

Sometimes you need to make data and/or event binding in the generated component, therefore you need to send data to it.

To do it, you need to save in a variable of type ComponentRef<> the new created component, and access properties and/or methods of the component.

```
  const alertComponentRef = viewContainer.createComponent(AlertComponent);
  alertComponentRef.instance.name = message;
```
