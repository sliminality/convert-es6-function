const assert = require('assert');
const arrowToExpression = require('../src/arrowToExpression');

describe('arrowToExpression', function () {
    it('handles inline arrow functions', function () {
        // No arguments.
        assert.equal(
            arrowToExpression(
`const x = 4;
const f = () => 1 + 1;
f() + x;`
            ),
`const x = 4;
const f = function() {
    return 1 + 1;
};
f() + x;`
        );

        // Multiple arguments.
        assert.equal(
            arrowToExpression(
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
        // TODO: No arguments
        // TODO: Multiple arguments
    });

    it('handles async inline arrow functions', function () {
        // TODO: No arguments
        // TODO: Multiple arguments
    });

    it('handles async block arrow functions', function () {
        // TODO: No arguments
        // TODO: Multiple arguments
    });
});
