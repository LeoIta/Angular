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

From the example above you can see that `string interpolation` has the syntax `{{data}}` where data could be:

1. **any string** (e.g. _'server2'_)
2. **any variable** defined in `servers.component.ts` (e.g. _servers[0].online_ or _servers[0].name_)
3. **any method** defined in `servers.component.ts` (e.g. _getServerStatus('server2')_)
4. **any typeScript code** (e.g. _servers[0].online && servers[1].online_)

---

## Property Binding

## Event Binding

## Two-Ways-Binding
