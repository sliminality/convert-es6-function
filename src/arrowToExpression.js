const esprima = require('esprima');

const arrowToExpression = (input) => {
    const ast = esprima.parse(input);
    return input;
};

module.exports = arrowToExpression;
