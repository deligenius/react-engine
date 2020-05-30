const [diagnostics, output] = await Deno.compile(
  "./reactEngine.ts",
  undefined,
  {
    allowJs: true,
    checkJs: true,
    lib: ["dom", "es2018"],
    sourceMap: false,
    target: "es2018",
    noImplicitAny: false,
    types: ["./types/react.d.ts", "./types/react-dom.d.ts"]
  }
);

// console.log(diagnostics)
console.log(output)