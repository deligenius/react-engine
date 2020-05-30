import {
  React,
  ReactDOMServer,
} from "https://raw.githubusercontent.com/deligenius/react-engine/master/mod.ts";
import {
  basename,
  extname,
  parse,
  join,
} from "https://deno.land/std/path/posix.ts";

async function getReactComponent(path: string) {
  let component = (await import(path)).default;
  return component;
}

function renderReact(component: React.FC, data: object) {
  const el = React.createElement(component, data, null);
  let str = ReactDOMServer.renderToString(el);
  return str;
}

function renderHtml(htmlPath: string, renderString: string) {
  const file = Deno.readTextFileSync(htmlPath);
  const resultHtml = file.replace("{{root}}", renderString);
  return resultHtml;
}

async function reactEngine(filePath: string, data: object) {
  let reactFile = "./src/index.tsx";
  let file = parse(reactFile);
  let component = await getReactComponent(reactFile);
  let renderStr = renderReact(component, data);
  let resultHtml = renderHtml(join(file.dir, `${file.name}.html`), renderStr);
  return resultHtml
}

console.log(await reactEngine("./src/index.tsx", {data: {name: "xiong"}}));
