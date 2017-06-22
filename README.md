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

## Doing Things

| To Do This | Type This |
|------------|-----------|
| Install dependencies | `yarn install` |
| Run tests once | `yarn test` |
| Run test watcher | `yarn run test:watch` |

## Stretch Goals

- [ ] Transform inline arrows into block arrows to throw in those glorious `debugger;` statements.

    ```js
    const f = (x, y) => 10 * x + y;

    // becomes
    const f = (x, y) => {
        return 10 * x + y;
    };
    ```

- [ ] Configure formatting settings (maybe eventually infer stuff like indentation?)
    
    ```js
    const f = (x, y) => 10 * x + y;

    // default output
    const f = function (x, y) {
        return 10 * x + y;
    };

    // with { indent: 2 }
    const f = function (x, y) {
      return 10 * x + y;
    };
    ```

- [ ] Convert arrow functions to function *declarations*.

    ```js
    const f = (x, y) => 10 * x + y;

    // default output
    const f = function (x, y) {
        return 10 * x + y;
    };

    // declaration
    function f(x, y) {
      return 10 * x + y;
    }
    ```
