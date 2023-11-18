# Data binding

`Data binding` creates a communication between the `business logic` (servers.component.ts) and the `template` (servers.component.html)

To send data, from the business logic to the user interface, you can use two type of databinding:

- [`string interpolation`](#string-interpolation)

- [`property binding`](#property-binding)

To send data, from the user interface to the business logic, you can use:

- [`event binding`](#event-binding)

To send data in both side at the same time, you can use:

- [`two-ways-binding`](#two-ways-binding).

---

![databinding](../assets/databinding.jpg "databinding")

## String Interpolation

To understand the different ways of using the `string interpolation`, you can define in the `servers.component.ts` a variable called servers and a method to get the server status from the server name.

```
  servers = [new Server('server1', true), new Server('server2', false)];

  getServerStatus(serverName: string): boolean {
    return this.servers.filter((server) => server.name === serverName)[0]
      .online;
  }
```

The variable `servers` is an Array of `Server` objects defined in `server.model.ts`

```
export class Server {
  constructor(public name: string, public online: boolean) {}
}
```

Now we can use the string interpolation to display data in the `servers.component.html` file.

Writing in your html file the follow:

```
<p>servers works!</p>
<p>{{servers[0].name}} is online: {{servers[0].online}}</p>
<p>{{'server2'}} is online: {{getServerStatus('server2')}}</p>
<p>both servers are online : {{servers[0].online && servers[1].online}}</p>
```

on the screen you'll see:

![string interpolation](../assets/string-interpolation.jpg "string interpolation")

From the example above you can see that `string interpolation` has the syntax `{{data}}` where `data` could be:

1. **any string** (e.g. _'server2'_)
2. **any variable** defined in `servers.component.ts` (e.g. _servers[0].online_ or _servers[0].name_)
3. **any method** defined in `servers.component.ts` (e.g. _getServerStatus('server2')_)
4. **any typeScript code** (e.g. _servers[0].online && servers[1].online_)

---

## Property Binding

Using `property binding` you can make dynamic any property.

In our example we have: \
`component-binding.component.html`

```
<h1>Property binding</h1>
<button [style.background-color]="'red'" [style.color]="getTextColor()">Red button</button>
<div class="flex-container">
  <button [disabled]="disabled">Button is {{disabled?'disabled':'active'}}</button>
  <p [style.background-color]="disabled?'red':'green'" class="circle"></p>
</div>
```

`component-binding.component.ts`

```
  disabled = true;
  constructor() {
    setInterval(() => {
      this.disabled = !this.disabled;
    }, 2000);
  }
  getTextColor() {
    return 'white';
  }
```

`component-binding.component.css`

```
.circle {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}

.flex-container {
  display: flex;
  flex-direction: row;
  width: 150px;
  justify-content: space-between;
  max-height: 20px;
  align-items: center;
  margin: 10px 0px;
}
```

The customer will see, based on the value of `disabled` the following view:
![property binding](../assets/property-binding.jpg "property binding")

This implementation will change every 2 seconds the value of the boolean `disabled` in `component-binding.component.ts`.

From the example above you can see that `property binding` has the syntax `[property]="data"` where `data` could be:

1. **any string** (e.g. _'red'_)
2. **any variable** defined in `component-binding.component.ts` (e.g. _disabled_)
3. **any method** defined in `component-binding.component.ts` (e.g. _getTextColor()_)
4. **any typeScript code** (e.g. _disabled?'red':'green'_)

## Event Binding

## Two-Ways-Binding
