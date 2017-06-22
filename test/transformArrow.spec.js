const assert = require('assert');
const transformArrow = require('../src/transformArrow');

describe('transformArrow', function () {
    it('handles inline arrow functions', function () {
        // No arguments.
        assert.equal(
            transformArrow(
`const x = 4;
const f = () => 1 + 1;
f() + x;`
            ),
`const x = 4;
const f = function () {
    return 1 + 1;
};
f() + x;`
        );

        // Multiple arguments.
        assert.equal(
            transformArrow(
`let addTwoMaybe = null;
if (true) {
    addTwoMaybe = (x, y) => x + y;
}`
            ),
`let addTwoMaybe = null;
if (true) {
    addTwoMaybe = function (x, y) {
        return x + y;
    };
}`
        );
    });

    it('handles block arrow functions', function () {
        // No arguments.
        assert.equal(
            transformArrow(
`const x = 4;
const f = () => {
    return 1 + 1;
};
f() + x;`
            ),
`const x = 4;
const f = function () {
    return 1 + 1;
};
f() + x;`
        );

        // Multiple arguments.
        assert.equal(
            transformArrow(
`let addTwoMaybe = null;
if (true) {
    addTwoMaybe = (x, y) => {
        const z = 10;
        return x + y + 10;
    };
}`
            ),
`let addTwoMaybe = null;
if (true) {
    addTwoMaybe = function (x, y) {
        const z = 10;
        return x + y + 10;
    };
}`
        );
    });

    it('handles async inline arrow functions', function () {
        // No arguments.
        assert.equal(
            transformArrow(
`const x = 4;
const f = async () => 1 + 1;
f() + x;`
            ),
`const x = 4;
const f = async function () {
    return 1 + 1;
};
f() + x;`
        );

        // Multiple arguments.
        assert.equal(
            transformArrow(
`let addTwoMaybe = null;
if (true) {
    addTwoMaybe = async (x, y) => x + y;
}`
            ),
`let addTwoMaybe = null;
if (true) {
    addTwoMaybe = async function (x, y) {
        return x + y;
    };
}`
        );
    });

    it('handles async block arrow functions', function () {
        // No arguments.
        assert.equal(
            transformArrow(
`const x = 4;
const f = async () => {
    return 1 + 1;
};
f() + x;`
            ),
`const x = 4;
const f = async function () {
    return 1 + 1;
};
f() + x;`
        );

        // Multiple arguments.
        assert.equal(
            transformArrow(
`let addTwoMaybe = null;
if (true) {
    addTwoMaybe = async (x, y) => {
        const z = 10;
        return x + y + 10;
    };
}`
            ),
`let addTwoMaybe = null;
if (true) {
    addTwoMaybe = async function (x, y) {
        const z = 10;
        return x + y + 10;
    };
}`
        );
    });
});
