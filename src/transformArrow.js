const assert = require('assert');
const esprima = require('esprima');
const escodegen = require('escodegen');

/**
 * General utils
 */
const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

/**
 * Esprima utils
 */
const createFunctionExpression = ({
    params = [],
    body = {
        type: esprima.Syntax.BlockStatement,
        body: [],
    },
    generator = false,
    async = false
}) => ({
    type: esprima.Syntax.FunctionExpression,
    expression: true,
    id: null,
    params,
    body,
    generator,
    async,
});

const createReturnStatement = (expression = null) => ({
    type: esprima.Syntax.ReturnStatement,
    argument: expression,
});

const createBlockStatement = (body = null) => ({
    type: esprima.Syntax.BlockStatement,
    body,
});

/**
 * Convert an ArrowFunctionExpression into a FunctionExpression.
 */
const arrowToFunctionExpression = arrow => {
    assert.equal(arrow.type, esprima.Syntax.ArrowFunctionExpression);

    const result = createFunctionExpression(arrow);
    // HACK: Prevent escodegen from wrapping the function body in parens.
    result.expression = false;

    // If the arrow function is inline, we need to add a return statement to
    // the resulting FunctionExpression.body
    const isInlineArrow = arrow.body !== esprima.Syntax.BlockStatement;

    if (isInlineArrow) {
        const bodyWithReturn = createBlockStatement([
            createReturnStatement(arrow.body)
        ]);
        result.body = bodyWithReturn;
    }

    return result;
};

/**
 * Search the AST to get the locations of all Expression nodes,
 * then transform.
 */
const transformArrow = source => {
    const arrows = [];
    const config = { range: true };
    let transformed = source;

    esprima.parse(source, config, node => {
        const isArrowFunction =
            node.type === esprima.Syntax.ArrowFunctionExpression;
        if (isArrowFunction) {
            arrows.push(node);
        }
    });

    arrows.sort((a, b) => b.end - a.end);

    for (const node of arrows) {
        assert(has(node, 'range'));
        const fnExpCode = escodegen.generate(
            arrowToFunctionExpression(node)
        );
        const [ start, end ] = node.range;
        const prefix = transformed.substring(0, start);
        const suffix = transformed.substring(end);
        transformed = `${prefix}${fnExpCode}${suffix}`;
    }

    // Invert once more to normalize indentation.
    const normalized = escodegen.generate(
        esprima.parse(transformed)
    );

    return normalized;
};

module.exports = transformArrow;
