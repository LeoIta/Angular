# Before Start

In order to work with Angular you'll need:

1. Check if you have NodeJs installed on your pc (in prompt command use `node --version`)
2. If you don't have it, you can download and install it from [NodeJs](https://nodejs.org/en/download/)
3. Install Angular running in a terminal the command `npm install -g @angular/cli.`
4. Install any IDE, like for example [VisualStudio](https://visualstudio.microsoft.com/downloads/)
5. To work easier with Angular projects using Visual Studio, it is recommended to install the plugin called `Angular Essentials`

# Start a Project

1. to create a new project called `myProject` run `ng new myProject`
2. if you want to use an old project, you have to go into the root folder and run `npm install` to install all the package listed inside the `package.json` file

## Run the application

Run `ng serve` to run the application. Navigate to `http://localhost:4200/`. The application will automatically reload if you change and save any of the source files.

## Default Angular files and folders

Inside the project directory you can find the files and directories that an Angular app needs to build and run, but they are not files that you normally interact with:

1. `.angular` has files required to build the Angular app.
2. `.e2e` has files used to test the app.
3. `node_modules` folder (if not, run `npm build`) that has the node.js packages that the app uses.
4. `angular.json` describes the Angular app to the app building tools.
5. `package.json` is used by npm (the node package manager) to run the finished app.
6. `tsconfig.*` are the files that describe the app's configuration to the TypeScript compiler.

Let's move to folder where we'll work more, the `src` folder:

1. `index.html` is the app's top level HTML template.
2. `style.css` is the app's top level style sheet.
3. `main.ts` is where the app start running.
4. `favicon.ico` is the app's icon, just as you would find in any web site.
5. `app` folder where new components willbe added later:
   1. `app.component.ts` is the source file that describes the app-root component. This is the top-level Angular component in the app. A component is the basic building block of an Angular application. The component description includes the component's code, HTML template, and styles, which can be described in this file, or in separate files. In this app, the styles are in a separate file while the component's code and HTML template are in this file.
   2. `app.component.css` is the style sheet for this component.
6. `assets` folder contains images used by the app
