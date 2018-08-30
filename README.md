# Advice Function

This is a basic implementation of [Advice](https://en.wikipedia.org/wiki/Advice_(programming)) pattern for functional programing.

## Before and After
Both functions called with the same arguments of the main functions. These functions don`t change the value of arguments or result value of main function.

### Example

```javascript
import advice from 'advice-function'

// hello world
const greeting = (pattern) => (name) => (pattern.replace('{name}', name))
const hello = advice(greeting('Hello {name}'))
  .before((name) => console.log('show wellcome message to', name))
  .after((name) => console.log(name, 'is greeted'))

hello('world')
```

## Arround
This decorator is the best of decorators, because we can use to multiple porpuse (replace arguments, call to another methods after and before to call main function, ....)

If You don´t set any function to Arround list, main function is called.

### Example
```javascript
import advice from 'advice-function'

// hello world
const greeting = (pattern) => (name) => (pattern.replace('{name}', name))
const hello = advice(greeting('Hello {name}'))
  .arround((mainFn) => (name) => {
    console.log('show wellcome message to', name)
    mainFn(name.toUpperCase())
    console.log(name, 'is greeted')
  })

hello('world')
```

## License

currency-format is licensed under the [MIT License](LICENSE).
