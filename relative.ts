import {dirname,resolve, join, relative, normalize, format, parse } from "https://deno.land/std/path/posix.ts";


// console.log(relative("file.ts", "."))

// console.log(normalize("./index.html"))

const parsed = parse("view/index.html")
console.log(parsed)

console.log(format(parsed))


console.log(dirname("/index.html"))