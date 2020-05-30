## 🌌 React Engine

> SSR(Server Side Rendering) engine for Deno

[![tag](https://img.shields.io/github/tag/deligenius/react-engine.svg)](https://github.com/gjuoun/view-engine)
[![license](https://img.shields.io/github/license/deligenius/react-engine.svg)](https://github.com/gjuoun/view-engine)
[![tag](https://img.shields.io/badge/deno-v1.0.2-green.svg)](https://github.com/denoland/deno)

---

### Usage

```ts
await reactEngine(
  filePath: string,
  data: object,
  htmlPath?: string
)
```
- ```filePath: string``` specify a **filename** with extension of ```.jsx/.tsx```
  - **filename** has to be **relative**, like ```./Index.jsx``` or ```./view/App.tsx```

- ```data: object``` is the data object of input as in ```prop```
  - eg, ```data``` = ```{data: {name: "John"}}``` , it will become a property in ```prop``` and can be access as ```prop.data.name```

- ```htmlPath?: string``` is a **static html file** you would like to be rendered. By default, react engine would look for ```[fileName].html```, if there is no htmlPath parameter.

### Getting started

##### A simple example, render ```./Index.jsx```
  1. To get react engine running, you need 3 files, ```app.ts```, ```Index.jsx```, ```Index.html```
```ts
// ./app.ts
import {reactEngine} from "https://raw.githubusercontent.com/deligenius/react-engine/master/mod.ts"
const html = await reactEngine("./Index.jsx", {data: {name: "John"} })
console.log(html)
```

```jsx
// ./Index.jsx
import React from "https://raw.githubusercontent.com/deligenius/react-engine/master/react.ts"
const Index = (props) => {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h3>{props.data.name}</h3>
    </div>
  );
};
export default Index;
```
```html
<!-- ./Index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React</title>
</head>
<body>
  {{root}}
</body>
</html>
```

 2.  React engine will first load React component ```Index.jsx``` then render with ```{data: {name: "John"}```, finally it will be injected into ```Index.html``` as ```{{root}}```

This is the **key argument** you need to care: 
```ts
// ./app.ts
const html = await reactEngine("./Index.jsx", {data: {name: "John"} })
```
 
 3. Run with command:
```ts
 > deno run --allow-read --allow-net .\app.ts```
```
  Result is a ```string``` and ready to be send out:
```html
<!-- ./Index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React</title>
</head>
<body>
  <div data-reactroot=""><h1>Hello, world!</h1><h3>John</h3></div>
</body>
</html>
```


## [🔝](#usage)