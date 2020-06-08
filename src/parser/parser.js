import * as mathjs from "mathjs"

export default function compile(expression) {
  const compiled = mathjs.compile(expression)
  return (x) => {
    if (typeof x !== "undefined") {
      return compiled.evaluate({ x })
    } else {
      return compiled.evaluate()
    }
  }
}
