// @deno-types="./node_modules/@types/react/index.d.ts"
import { React } from "https://raw.githubusercontent.com/deligenius/react-engine/master/mod.ts";
// @deno-types="./node_modules/@types/react-dom/server/index.d.ts"
import {
  ReactDOMServer,
} from "https://raw.githubusercontent.com/deligenius/react-engine/master/mod.ts";

import {
  basename,
  extname,
  parse,
  join,
} from "https://deno.land/std/path/posix.ts";

async function getReactComponent(path: string): React.Component {
  try {
    let component = (await import(path)).default;
    return component;
  } catch (e) {
    console.log(e);
    throw new Error("reactengine - load component failed:" + path);
  }
}

function renderReact(component: React.FC, data: object): string {
  try {
    const el = React.createElement(component, data, null);
    let str = ReactDOMServer.renderToString(el);
    return str;
  } catch (e) {
    // data is missing some field
    throw e;
  }
}

function renderHtml(htmlPath: string, renderString: string): string {
  try {
    const file = Deno.readTextFileSync(htmlPath);
    const resultHtml = file.replace("{{root}}", renderString);
    return resultHtml;
  } catch (e) {
    throw new Error("cannot find the html file: " + htmlPath);
  }
}

async function reactEngine(
  filePath: string,
  data: object,
  htmlPath?: string,
): Promise<string> {
  let file = parse(filePath);
  let htmlFile = htmlPath ?? `${file.name}.html`;
  let component = await getReactComponent(filePath);
  let renderStr = renderReact(component, data);
  let resultHtml = renderHtml(join(file.dir, htmlFile), renderStr);
  return resultHtml;
}

console.log(await reactEngine("./src/index.tsx", { data: { name: "jun" } }));
