const fluent = (fn, context) => (...args) => (fn(...args), context)
const factory = (arr) => (fn) => arr.push(fn)

/**
 * Returns an advisable function.
 * @function
 * @argument {Function} primaryFn Primary function of advice
 * @returns {Function} The advisable Function.
 */
module.exports = function advice(primaryFn) {
  const before = []
  const after = []
  const arround = []

  const gn = function adviceFn(...args) {
    const fireFn = (fn) => fn(...args)
    const arroundReducer = (acc, fn) => fn(primaryFn, acc)(...args)
    let value

    before.forEach(fireFn)
    value = arround.length && arround.reduce(arroundReducer, value) || primaryFn(...args)
    after.forEach(fireFn)

    return value
  }

  
  gn.before = fluent(factory(before), gn)
  gn.after = fluent(factory(after), gn)
  gn.arround = fluent(factory(arround), gn)

  return gn;
}