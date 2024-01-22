# Pipes

`Pipes` are simple functions to use in HTML template expressions to transform values when using string interpolation.

`Pipes` are useful because you can transofrm value in that specific view ,without changing the value on the TS side.

Let's see in the next chapters:

1. [how to use single pipe without arguments](#how-to-use-single-pipe-without-arguments)
2. [how to use single pipe with arguments](#how-to-use-single-pipe-with-arguments)
3. [how to use async pipe](#how-to-use-async-pipe)
4. [how to create custom pipe without arguments](#how-to-create-custom-pipe-without-arguments)
5. [how to create custom pipe with arguments](#how-to-create-custom-pipe-with-arguments)
6. [how to concatenate multiple pipes](#how-to-concatenate-multiple-pipes)
7. [how to use pipes to filter or sort](#how-to-use-pipes-to-filter-or-sort)

## How to use single pipe without arguments

You can apply a `pipe` to a string interpolation inside the double curly brackets, putting, after the value or parameter, a vertical line sign, also called `pipe`, `|`.

Angular has some build-in pipes that can be used, some examples of the most used are:

- `uppercase` to capitalize all the chars of a string - `<p>{{'GoodMorning'|uppercase}}</p>`
- `lowercase` to make all the chars of a string lowercase - `<p>{{myString|lowercase}}</p>`
- `percent` to change a number to percent format - `<p>{{ 0.1456789 | percent}}</p>`
- `currency` to add currency to a number, before the value - `<p>{{ number | currency}}</p>`
- `date` to convert number of seconds passed since 01/01/1970, to a date format - `<p>{{myDate | date}}</p>`

If you define 3 variables like below:

```
myString: string = 'Hello'
myNumber: number = 3.1456789
myDate: Date = Date.now()
```

the result of these pipes on the values, will be:

```
without pipe    -> with pipe

GoodMorning     -> GOODMORNING
Hello           -> hello
0.1456789       -> 14.56789%
3.1456789       -> $3.1456789
1705822187496   -> Jan 21, 2024
```

To explore all the possible buil-in pipes in Angular, you can have a look on Angular documentation in [Angular pipes](https://angular.dev/guide/pipes)

## How to use single pipe with arguments

The `pipes` often have arguments that help you to customized their use, to set them, you use a column sign `:` after the pipe name e.g. `|number:'1.2'`

The pipe `number` followed by arguments allow you to set the number of digits of integer and decimal parts.

- `|number:'2'` will not display anything as the argument accept a string where you define two values divided by a dot
- `|number:'2.0'` will display a number with 2 digits, without any decimal
- `|number:'1-2.0-5'` will display a number with 1 to 2 digits, with 0 to 5 decimals
- `|number:'1-2.0-'` will not display anything as the range must always have a lower and upper limit defined before and after the dash `-`

This argument is also used for `percent` format.

The `currency`pipe allows you to set up to 4 arguments:

- `currency code`, that is the currency you want to use, e.g. one of the [world currency codes](https://www.xe.com/symbols/); default value if you do not use arguments is the United States Dollar `USD`
- `display` that indicates how you want to display the currency, the most used options are `code` and `symbol` that will display `USD` and `$` by default
- `digitInfo` that indicates the format of the number, like for `number` and `percent`
- `locale` indicates which `locale` to use e.g. 'en-US', generally used when your application is used in different languages

The `date` pipe allows you to set up to 3 arguments:

- `format`, that indicates in which format you wnat to diplay the date, default is `'mediumDate'` that will format like `Jan 21, 2024`, but you can select a lot of other build-in options or set your own format, e.g. `'dd/MM/YY hh:mm aa'` For more details explore inside the angular module `node_modules/@angular/common/index.d.ts`
- `timezone`, default value is the end-user's local system timezone, but you can set any [time zone abbreviation](https://www.timeanddate.com/time/zones/) using `abbreviation - 'EST'` or `offset - 'UTC+05:00' or 'GMT-03'`where UTC will show 0-24h and GMT 0-12h AM-PM
- `locale`, it will adapt the build-in format to the locale you select

To explore all possible arguments for the buil-in pipes in Angular, you can have a look on Angular documentation in [Angular pipes](https://angular.dev/guide/pipes)

## How to use async pipe

The `async` pipe is used in case the value to display is coming from a promise or an obsevable, that can take some time to get the value; it helps to wait to have an actuall value before display ans actual value.

Let assume that you have a variable to be passed in the string interpolation that is coming from a Promise or an Observable:

```
asyncValue = timer(2000).pipe(
  map(() => {
    return 'You have wait 2 sec to see it';
  })
);
```

if you put in the template:

```
<p>{{asyncValue}}</p>
```

it will display `[object Object]`.

If you add the `async` pipe after the value, it will display the value only when the promise / observable returns a value:

```
<p>{{asyncValue}}</p>
```

will display `You have wait 2 sec to see it`.

## How to create custom pipe without arguments

It is possible to create new `custom pipe` using command:
`ng generate pipe pipeName`
or short command:
`ng g p pipeName`
it will generate 2 files with extension `.pipe.ts` and `.pipe.spec.ts`; if you are not interested in test, you can skip the creation using `--skip-tests=true` after the command to generate the pipe:
`ng g p pipeNoArgs --skip-tests=true`

It will also add in the `app.module`, inside declarations array the created pipe class.

```
declarations: [
  DoublePipe,
  ExtractStringPipe,
]
```

If you want to create it from scratch, you need to create a class called `pipename.pipe.ts` as below:

```
@Pipe({
  name: 'substring',
})
export class SubStringPipe implements PipeTransform {
  transform(value: string, start: number, end: number): string {
    return '';
  }
}
```

As you can see in the above example, the class should implement `PipeTransform` interface and implement method `transform`, that accept at least 1 argument, that is the element to which you should apply the pipe.

To the class you should apply the decorator `@Pipe` that accept as argument an object.

The object must have at least defined the property called `name` that define how to call the pipe in the HTML template.

## How to create custom pipe with arguments

If you want to have arguments in the pipe, you shoudl have more than one argument in the transform method, e.g.:

```
transform(value: string, start: number, end: number): string {
    return value.substring(start, end);
  }
```

You can set a property as option, eventually, e.g. `end?:number` or you can also have objects as arguments , e.g. `options: { start: number | 0; end?: number }`

You'll use the custom pipes same as the build-in pipes:

```
<p>{{5|double}}</p>
<p>{{'abcdefghijklmopqrstuvwxyz'|substring:15:16}}</p>
<p>{{'abcdefghijklmopqrstuvwxyz'|optsubstring:{start:15}}}</p>
```

## How to concatenate multiple pipes

It is possible to apply multiple pipes to the same string interpolation, but you should put attention on the order.

TO apply multiple pipe, you put next pipe after the first pipe definition, e.g. :
`<p>{{'abcd'|substring:2:3|uppercase}}</p>`
In this example you first reduce the string, and then you put everything in capital letters.

One case where the order is important is:

```
{{10|double|currency}}
{{10|currency|double}}
```

In the first line, you'll get `$20.00`, in the second case you'll get an error as currency cannot be multiply by 2.

## How to use pipes to filter or sort

You can apply the pipe to arrays to `filter` info of an `ngFor loop`:

```
<input name="name" [(ngModel)]="filterName">
<input name="team" [(ngModel)]="filterTeam">
<input name="num" [(ngModel)]="filterNum">
<tr *ngFor="let item of players
  | filter:filterName:'name'
  | filter:filterTeam:'team'
  | filter:filterNum:'num'">
  <td>{{item.name}}</td>
  <td>{{item.team}}</td>
  <td>{{item.num}}</td>
</tr>
```

defining a pipe like [filterPipe](../app/pipes/filter.pipe.ts):

```
transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const filtered = [];
    for (const item of value) {
      if (item[propName].includes(filterString)) {
        filtered.push(item);
      }
    }
    return filtered;
  }
```

You can also sort using pipes like [sortPipe](../app/pipes/sort.pipe.ts) applied to [filter-pipe.component.html](../app/pipes/filter-pipe/filter-pipe.component.html):

```
<select name="sortBy" [(ngModel)]="sortByKey">
  <option value="name">name</option>
  <option value="team">team</option>
  <option value="num">number</option>
</select>
...
|sort:sortByKey
```
