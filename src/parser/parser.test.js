const mathjs = require('mathjs')

function compile(expression) {
  const compiled = mathjs.compile(expression)
  return (x) => {
    if (typeof x !== 'undefined') {
        return compiled.evaluate({x})
    } else {
        return compiled.evaluate()
    }
  }
}

test('1 + 2', () => {
  const func = compile("1+2")
  expect(func()).toBe(3);
});

test('x^2', () => {
  const func = compile("x^2")
  expect(func(5)).toBe(25);
  expect(func(-5)).toBe(25);
});

test('1/x', () => {
  const func = compile("1/x")
  expect(func(0)).toBe(Infinity);
  expect(func(5)).toBe(0.2);
});

test('-sqrt(9)', () => {
  const func = compile("-sqrt(9)")
  expect(func()).toBe(-3);
});

test('sqrt(x)', () => {
  const func = compile("sqrt(x)")
  expect(func(9)).toBe(3);
});

test('-x + x^2 / 9', () => {
  const func = compile("-x + x^2 / 9")
  expect(func(9)).toBe(0);
});

test('-x + x^2 / -9', () => {
  const func = compile("-x + x^2 / -9")
  expect(func(9)).toBe(-18);
});
