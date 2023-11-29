# Services

Passing data among components, that are not in relationship parent/child, can be hard as you need to use several `Input/Output` decorators.
To be able to share data among components on different layers and relationship, you need to use `services`.

A `service` is a class that can share its properties and methods (e.g you can have a service for each downstream of your application, storing data retrieved by calling an external API).

```
export class PeopleService {
}
```

To inject and use a service (e.g. `PeopleService`) in a component (e.g. `ApplicationComponent`) you have to:

1. [make the `service injectable`](#make-service-available) (available) in your component(s)
2. [`inject the service`](#service-injection) in your component (create an instance of the service)
3. [`use the service`](#use-the-service) properties and methods

There is also possibility to [inject a service in another one](#inject-a-service-in-another-service), but it requests an additional step.

## Make service available

In order to make a `service injectable`, in one or more components, there are two ways:

1. adding the `@Injectable` decorator to the service class, setting the property `providedIn` equal to the selector name of the component where the service should be available (e.g. `'root'`). \
   This is the default way used by Angular when you automatically generate a new service.
   ```
   @Injectable({
   providedIn: 'root',
   })
   ```
2. add service in the `@Component()` decorator, of the component where the service should be available, under the property `providers`:

   ```
   providers: [GlobalService],
   ```

**Please note that**

1. when a service is available for a component, it is available as well for all its children. It means that putting 'root' you are making the service available in any component in your application.
2. if you want to share the same instance of the service among parent/children components, it is enough to use just one of the previous cases, to make the service available in the parent and then inject the service in all the children using the `injection`.
3. If you want a new instance of the service, in any child and its children, you should make add, inside that specific child, the `service` under the `providers`.

## Service injection

When you are sure that the `service` is `injectable` in your component, in order to use the `service`, you should `inject` it into your component.

`Injection` of a class means that the framework (Angular, in this case) creates, for you, an instance of the class (object), that you can use later in your component.ts

To inject a service there are two ways:

1. `constructor injection`: you add the service as argument, with `access modifier` private/public, in the constructor of the component (in this way you also define a property of the component):
   ```
   constructor(private peopleService: PeopleService) {}
   ```
2. `method injection`:
   - you create a variable in the component
   - add this variable in the constructor arguments without `access modifier` private/public
   - initialize in the constructor body the variable using the `inject()` method
   ```
   private globalService?: GlobalService;
   constructor() {
    this.globalService = inject(GlobalService);
   }
   ```

The `constructor injection` is the simplest and suggested one.

## Use the service

Once the `service` is `injectable` and `injected` in your component, you can use the property to which the service is linked, to consume the methods and property of the `injected service`.

# Inject a service in another service

Assuming that you want to inject inside `PeopleService` the `MainService`, you should:

1. make `MainService` injectable into `PeopleService`, for example adding `MainService` in the `providers` of the `app.modules.ts`

```
  providers: [MainService],
```

2. inject the service using, e.g `constructor injection` in `PeopleService`

```
   constructor(private mainService: MainService) {}
```

3. add the `@Injectable()` decorator, without any argument, to the receiving service (`PeopleService` in this case), to enable the service to inject another service.

4. use the injected service

**note** Alternative to make steps 2 plus 3, you can use only the `method injection` and skip step 3
