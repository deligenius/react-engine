import React from "./react.ts";
import ReactDOMServer from "./react-dom-server.ts";

import {
  parse,
  join,
} from "https://deno.land/std/path/posix.ts";

// import { parse, join } from "https://deno.land/std/path/mod.ts";

function currentDir() {
  let localPath = Deno.cwd().replace(/\\/g, "/");
  return localPath;
}

async function getReactComponent(importPath: string): React.Component {
  let cwd = currentDir();

  try {
    importPath = "file://" + join(cwd, importPath);
    let component = (await import(importPath)).default;
    return component;
  } catch (e) {
    console.log(e);
    throw new Error("reactengine - load component failed:" + importPath);
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

export async function reactEngine(
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
