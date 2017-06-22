# convert-es6-function

THIS IS VERY WIP

Transform this:

```js
const f = (x, y) => 10 * x + y;
```

into this:

```js
const f = function (x, y) {
    return 10 * x + y;
};
```

and back again (not currently implemented).

Stretch goals: transform inline arrows into block arrows to throw in those glorious `debugger;` statements.

```js
const f = (x, y) => 10 * x + y;

// becomes
const f = (x, y) => {
    return 10 * x + y;
};
```
