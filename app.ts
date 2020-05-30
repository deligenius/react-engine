// ./app.ts
import {reactEngine} from "https://raw.githubusercontent.com/deligenius/react-engine/master/mod.ts"
const html = await reactEngine("./Index.jsx", {data: {name: "John"} })
console.log(html)