## 🌌 React Engine

> SSR(Server Side Rendering) engine for Deno

[![tag](https://img.shields.io/github/tag/deligenius/react-engine.svg)](https://github.com/gjuoun/view-engine)
[![license](https://img.shields.io/github/license/deligenius/react-engine.svg)](https://github.com/gjuoun/view-engine)
[![tag](https://img.shields.io/badge/deno-v1.0.2-green.svg)](https://github.com/denoland/deno)

---

### Usage

```ts
reactEngine(
  filePath: string,
  data: object,
  htmlPath?: string
)
```
- ```filePath: string``` specify a **filename** with extension of ```.jsx/.tsx```
  - eg: ```index.jsx```, ```./view/page.jsx```, ```./contact.tsx```

- ```data: object``` is the data object of input as in ```prop```
  - eg, ```data``` = ```{data: {name: "John"}}``` , it will become a property in ```prop``` and can be access as ```prop.data.name```

- ```htmlPath?: string``` is a **static html file** you would like to be rendered. By default, react engine would look for ```[fileName].html```, if there is no htmlPath parameter.

### Getting started

##### A simple example, render ```Index.jsx```
  1. To get react engine running, you need 3 files, ```app.ts```, ```Index.jsx```, ```Index.html```
```ts
// ./app.ts
import 
const html = reactEngine("index.jsx", {data: {name: "John"} })
console.log(html)
```
  1.  React engine first will look for parameters of ```filePath```



## [🔝](#table-of-contents)