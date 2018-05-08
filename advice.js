const BEFORE = Symbol('before')
const AFTER = Symbol('after')
const AROUND = Symbol('around')
const ADVISABLE = Symbol('advisable')

const factory = (sym) => (primaryFn) => (fn) => (advisable(primaryFn)[sym].push(fn), primaryFn)

module.exports = advisable;

module.exports.before = factory(BEFORE);

module.exports.after = factory(AFTER);

module.exports.around = factory(AROUND);


/**
 * Returns an advisable function.
 * @function
 * @argument {Function} primaryFn Primary function of advice
 * @returns {Function} The advisable Function.
 */
function advisable (primaryFn) {
  if (primaryFn[ADVISABLE]) {
    return primaryFn;
  }

  const gn = function advisableFn(...args) {
    const pipeReducer = (acc, fn) => fn(...args, acc)
    const arroundReducer = (acc, fn) => fn (primaryFn, ...args, acc)
    let value
    console.log('0', value)
    value = gn[BEFORE].reduce(pipeReducer, value)
    console.log('1', value, gn[BEFORE])
    value = gn[AROUND].length && gn[AROUND].reduce(arroundReducer, value) || primaryFn(...args)
    value = gn[AFTER].reduce(pipeReducer, value)

    return value
  }

  gn[ADVISABLE] = true;
  gn[BEFORE]    = [];
  gn[AFTER]     = [];
  gn[AROUND]    = [];

  const factory = (sym) => (fn) => (gn[BEFORE].push(fn), gn)
  gn.before     = factory(BEFORE);
  gn.after      = factory(AFTER);
  gn.around     = factory(AROUND);

  return gn;
}
