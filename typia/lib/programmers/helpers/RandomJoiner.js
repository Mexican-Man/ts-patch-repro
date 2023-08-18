import ts from "typescript";
import { StatementFactory } from "../../factories/StatementFactory";
import { TypeFactory } from "../../factories/TypeFactory";
import { Escaper } from "../../utils/Escaper";
import { get_comment_tags } from "../internal/get_comment_tags";
export var RandomJoiner;
(function (RandomJoiner) {
    RandomJoiner.array = (coalesce) => (decoder) => (explore) => (length) => (item, tags, comments) => {
        const generator = ts.factory.createCallExpression(coalesce("array"), undefined, [
            ts.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, decoder(item, tags, comments)),
            ...(length ? [length] : []),
        ]);
        if (explore.recursive === false)
            return generator;
        return ts.factory.createConditionalExpression(ts.factory.createGreaterThanEquals(ts.factory.createNumericLiteral(5), ts.factory.createIdentifier("_depth")), undefined, generator, undefined, ts.factory.createArrayLiteralExpression([]));
    };
    RandomJoiner.tuple = (decoder) => (items, tags, comments) => ts.factory.createArrayLiteralExpression(items.map((i) => { var _a; return decoder((_a = i.rest) !== null && _a !== void 0 ? _a : i, tags, comments); }), true);
    RandomJoiner.object = (coalesce) => (decoder) => (obj) => {
        if (obj.properties.length === 0)
            return ts.factory.createIdentifier("{}");
        const regular = obj.properties.filter((p) => p.key.isSoleLiteral());
        const dynamic = obj.properties.filter((p) => !p.key.isSoleLiteral());
        const literal = ts.factory.createObjectLiteralExpression(regular.map((p) => {
            const str = p.key.getSoleLiteral();
            return ts.factory.createPropertyAssignment(Escaper.variable(str)
                ? str
                : ts.factory.createStringLiteral(str), decoder(p.value, p.tags, get_comment_tags(false)(p.jsDocTags)));
        }), true);
        if (dynamic.length === 0)
            return literal;
        const properties = dynamic.map((p) => ts.factory.createExpressionStatement(dynamicProperty(coalesce)(decoder)(p)));
        return ts.factory.createBlock([
            StatementFactory.constant("output", ts.factory.createAsExpression(literal, TypeFactory.keyword("any"))),
            ...(obj.recursive
                ? [
                    ts.factory.createIfStatement(ts.factory.createGreaterThanEquals(ts.factory.createNumericLiteral(5), ts.factory.createIdentifier("_depth")), ts.factory.createBlock(properties, true)),
                ]
                : properties),
            ts.factory.createReturnStatement(ts.factory.createIdentifier("output")),
        ], true);
    };
    const dynamicProperty = (coalesce) => (decoder) => (p) => ts.factory.createCallExpression(coalesce("array"), undefined, [
        ts.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, ts.factory.createBinaryExpression(ts.factory.createElementAccessExpression(ts.factory.createIdentifier("output"), decoder(p.key, [], [])), ts.factory.createToken(ts.SyntaxKind.EqualsToken), decoder(p.value, p.tags, get_comment_tags(false)(p.jsDocTags)))),
        ts.factory.createCallExpression(coalesce("integer"), undefined, [
            ts.factory.createNumericLiteral(0),
            ts.factory.createNumericLiteral(3),
        ]),
    ]);
})(RandomJoiner || (RandomJoiner = {}));
//# sourceMappingURL=RandomJoiner.js.map