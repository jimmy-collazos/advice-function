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

  const factory = (arr) => (fn) => (arr.push(fn), gn)
  gn.before = factory(before);
  gn.after = factory(after);
  gn.arround = factory(arround);

  return gn;
}