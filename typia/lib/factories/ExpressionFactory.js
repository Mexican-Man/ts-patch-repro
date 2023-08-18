import ts from "typescript";
export var ExpressionFactory;
(function (ExpressionFactory) {
    ExpressionFactory.isRequired = (input) => ts.factory.createStrictInequality(ts.factory.createIdentifier("undefined"), input);
    ExpressionFactory.isArray = (input) => ts.factory.createCallExpression(ts.factory.createIdentifier("Array.isArray"), undefined, [input]);
    ExpressionFactory.isObject = (options) => (input) => {
        const conditions = [
            ts.factory.createStrictEquality(ts.factory.createStringLiteral("object"), ts.factory.createTypeOfExpression(input)),
        ];
        if (options.checkNull === true)
            conditions.push(ts.factory.createStrictInequality(ts.factory.createNull(), input));
        if (options.checkArray === true)
            conditions.push(ts.factory.createStrictEquality(ts.factory.createFalse(), ts.factory.createCallExpression(ts.factory.createIdentifier("Array.isArray"), undefined, [input])));
        return conditions.length === 1
            ? conditions[0]
            : conditions.reduce((x, y) => ts.factory.createLogicalAnd(x, y));
    };
    ExpressionFactory.isInstanceOf = (type) => (input) => {
        return ts.factory.createBinaryExpression(input, ts.factory.createToken(ts.SyntaxKind.InstanceOfKeyword), ts.factory.createIdentifier(type));
    };
    ExpressionFactory.coalesce = (x) => (y) => ts.factory.createBinaryExpression(x, ts.factory.createToken(ts.SyntaxKind.QuestionQuestionToken), y);
})(ExpressionFactory || (ExpressionFactory = {}));
//# sourceMappingURL=ExpressionFactory.js.map