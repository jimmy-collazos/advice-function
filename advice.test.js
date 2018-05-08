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

test('should decorate argument before call primary function', ({plan, equal}) => {
  let pFn = (obj) => obj.test
  let obj = {test: false}
  let expected = true
  const actual = advice(pFn).before((v) => (obj.test = true))(obj)

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
