const transformArrow = require('./src/transformArrow');
const { Syntax } = require('esprima');

const convert = (source, config = {
    from: Syntax.ArrowFunctionExpression,
}) => {
    let result;
    if (config.from === Syntax.ArrowFunctionExpression) {
        result = transformArrow(source);
    }
    return result;
};

module.exports = convert;
