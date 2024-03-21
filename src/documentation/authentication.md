# Authentication

Authentication is an important feature to add to your application. It allows to restrict access to pages and data in the database.

To have an efficient authentication you should connect your Angular project with a rest api on server side.

The client interface, your Angular project, should have a login/signup form, to collect the authentication data. Angular send them to the server, using an Http request, and get in response a token, that will be attached to all the requests that require authentication.

Let's see in details how to implement in Angular the following:

- [Login and Signup](#login-and-signup)
- [Error Handling](#error-handling)
- [Http request with token](#http-request-with-token)
- [Store token](#store-token-to-keep-user-logged-in)
- [Logout and auto logout](#logout-and-auto-logout)
- [Protect pages access](#protect-pages-access)

## Login and Signup

For both `login` and `signup`, the client (Angular application), collects authorization data (in most of the cases they are username and password, or mail and password) and send them to the server.

Server validates the credentials and can return:

- an `error` - if validation fails
- a `token` - if validation succeeds

The difference between Login and Signup is in the validation on server side.

For a `login request`, server checks if in the database exists any account that matches the provided credentials (e.g. mail and password).

For a `signup request`, server checks if the provided account already exists in the database (e.g. mail or username), if not, it creates a new one.

If the `login request` fails because the credentials do not match any accounts, the server will return an error, that could be e.g. `wrong password`, `wrong username`, `wrong credentials`.

If the `signup request` fails because the account already exists in the database, the server will return an error similar to `user already exists`.

If the `login` or `signup` request succeeds, server responses with an object that contains `token`.

The `token` is generated from the server using an algorithm and a secret key, that only the server knows.All the authenticated requests to the server, will require a `token` in the request.
The server will validate the token provided by the client, and will return the data only if the token is recognized by the server as a valid one.

If token is not valid, the server will return the `401 Unauthorized` error, that indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.

To store the user data, you can use an object of type `BehaviorSubject`, that allowes you to access the last emitted value, even if you subscribe after it has been emitted.

## Error Handling

If you know the body of the error response of the API your Angular project is consuming, you can extract the error code and handle the error as described in the section [HTTP error handling](./http.md#http-error-handling).

## Http request with token

The best way to make http requests for authentication and to manage the login and logout, is to use a dedicated service that makes these `login` and `signup` requests and then store the response and the token in variables. In this way you can easily add the token into the authorization header for the other http requests.

The authorization header can be added directly into each http call, or through the use of [interceptors](./http.md#http-interceptors).

## Store token to keep user logged in

Storing token in variables in the application is not enough if you want to keep the user logged in, because the variables will be reset every time the user reload manually the page or write any path of the website manually.
The users will need to login again even if the token is still valid and they are logged in.

To avoid the above situation, you need to store the token somewhere in the browser, so that the manual action will not affect the token validity.
One often used option, is to save the user data inside the `local storage` and load it everytime you want to acces a page, even if user manually input an URL or reload the page.

You store the user data in the local storage as a string from the user object:

```
localStorage.setItem('localUser', JSON.stringify(user));
```

And when you need it, you retrieve the user data and transform it from a string to an user object

```
const authUser: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      }
       = JSON.parse(localStorage.getItem('localUser'));
```

## Logout and auto logout

To logout the user, you should clean the `user data` and `token`. You should clean the variable in the authorization service, or in the local storage, or both, based on where the authorization data are stored.
You can create a method to do it , when a button is clicked.

```
this.user.next(this.defaultUser);
localStorage.removeItem('localUser');
```

where default user is an empty user that indicates an unlogged user.

When an user is authenticated, the server returns an object that contains, together with the `token`, also the `expiration date` that indicates until when the token will be valid, after this date, user should authenticate again, if there is no feature to refresh the token.

To avoid allowing user to navigate pages in your application even if the token has expired, you should create a function that logs the user out, and deletes the authorization data, when the current date and time have passed the expiration date.

```
autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
```

In the above function has been used a setTimeout that log the user out after the expiration duration that is equal to the difference between the current date and the expiration date.

You should remember to clear the timeout if the user manually logout from your application:

```
if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
```

You should place the autoLogout function in the login function.

When the user manually logout or is automatically logout, should be redirect to the login/signup page:

```
this.router.navigate(['/login']);
```

## Protect pages access

Sometimes, you would like to protect the access to your web pages, enabling the access only if user is logged in.
In order to do it, there are multiple solutions, you can use:

1. `ngIf`on the component, to display component only if user is logged in, but you'll need to use one ngIf, and one dedicated variable in the component, for each component you want to protect, it is ok if you want to protectonly one component, but it is not a good solution for complicated project where you want to protect a lot of pages.
2. `CanActivate` in the routing, to display the path only if user is logged in. It is a better solution than the previous one, as it makes easier to protect multiple pages in complicated projects. The bad of this solution is that your aplication will:

- load the components defined in that path, consuming memory, if content will not be displayed
- make the http calls getting `401 - Unauthorized` error in response, as the token will be missed, and the console will contain multiple errors

3. `CanMatch` in the routing, to load and display the path only if user is logged in. It is the best solution of the three as you'll save Http errors, due to missed token, and memory, as contents are loaded only if they need to be displayed.

In addition, if you use guards, instead of ngIf, you can also control where to redirect user if not logged, for example to the login/signup page.

Let's see one example of how to use `CanMatch`:

```
export const logGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  return inject(AuthorizationService).user.pipe(
    take(1),
    map((user) => {
      return !!user.token;
    }),
    tap((bool) => {
      if (!bool) {
        router.navigate(['/login']);
      }
    })
  );
};
```

In this case has been used:

1. the `take(1)` to get only the last emitted value, and unsubscribe from the observable.
2. the `map` to verify if the user is authenticated
3. the `tap` to redirect the user to login page if not authorized, using `router.navigate(['/login'])`.
