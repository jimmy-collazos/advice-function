const test = require('tape')
const advice = require('./advice')


// fixture functions
const identity = (v) => v;
const sum = (a) => (b) => (a + b);

test('should return identity value when dont have decorators', ({plan, equal}) =>{
  const expected = 'TEST';
  const actual = advice(identity)(expected);

  plan(1)
  equal(actual, expected)
})

test('should enable the primary function before call it', ({plan, equal}) => {
  const echo = (v) => echo.enabled && v;
  let expected = 'abc'
  let actual = advice(echo).before(() => echo.enabled = true)('abc')

  plan(1)
  equal(actual, expected)
})

test('should return fluent api when use "before" decorator', ({plan, deepEqual}) => {
  const fn = advice(sum)
  const expected = fn.before
  const actual = fn.before(identity).before(identity).before

  plan(1)
  deepEqual(actual, expected)
})

test('should enable the primary function after call it', ({plan, equal}) => {
  const echo = (v) => echo.enabled && v;
  let expected = undefined
  let actual = advice(echo).after(() => echo.enabled = true, 'ads')('abc')

  plan(1)
  equal(actual, expected)
})

test('should return fluent api when use "after" decorator', ({plan, deepEqual}) => {
  const fn = advice(sum)
  const expected = fn.after
  const actual = fn.after(identity).after(identity).after

  plan(1)
  deepEqual(actual, expected)
})