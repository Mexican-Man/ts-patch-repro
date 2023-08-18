import ts from "typescript";
import { StatementFactory } from "../../factories/StatementFactory";
import { TypeFactory } from "../../factories/TypeFactory";
import { Escaper } from "../../utils/Escaper";
import { metadata_to_pattern } from "../internal/metadata_to_pattern";
export var CloneJoiner;
(function (CloneJoiner) {
    CloneJoiner.object = (input, entries) => {
        if (entries.length === 0)
            return ts.factory.createIdentifier("{}");
        const regular = entries.filter((e) => e.key.isSoleLiteral());
        const dynamic = entries.filter((e) => !e.key.isSoleLiteral());
        const literal = ts.factory.createObjectLiteralExpression(regular.map((entry) => {
            const str = entry.key.getSoleLiteral();
            return ts.factory.createPropertyAssignment(Escaper.variable(str)
                ? str
                : ts.factory.createStringLiteral(str), entry.expression);
        }), true);
        if (dynamic.length === 0)
            return literal;
        const key = ts.factory.createIdentifier("key");
        const value = ts.factory.createIdentifier("value");
        const output = ts.factory.createIdentifier("output");
        const statements = dynamic.map((entry) => ts.factory.createIfStatement(ts.factory.createCallExpression(ts.factory.createIdentifier(`RegExp(/${metadata_to_pattern(true)(entry.key)}/).test`), undefined, [key]), ts.factory.createBlock([
            ts.factory.createExpressionStatement(ts.factory.createBinaryExpression(ts.factory.createElementAccessExpression(output, key), ts.factory.createToken(ts.SyntaxKind.EqualsToken), entry.expression)),
            ts.factory.createContinueStatement(),
        ])));
        return ts.factory.createBlock([
            StatementFactory.constant("output", ts.factory.createAsExpression(literal, TypeFactory.keyword("any"))),
            ts.factory.createForOfStatement(undefined, ts.factory.createVariableDeclarationList([
                ts.factory.createVariableDeclaration(ts.factory.createArrayBindingPattern([
                    ts.factory.createBindingElement(undefined, undefined, key, undefined),
                    ts.factory.createBindingElement(undefined, undefined, value, undefined),
                ]), undefined, undefined, undefined),
            ], ts.NodeFlags.Const), ts.factory.createCallExpression(ts.factory.createIdentifier("Object.entries"), undefined, [input]), ts.factory.createBlock(statements)),
            ts.factory.createReturnStatement(output),
        ]);
    };
    CloneJoiner.tuple = (children, rest) => {
        return ts.factory.createAsExpression(ts.factory.createArrayLiteralExpression(rest === null
            ? children
            : [...children, ts.factory.createSpreadElement(rest)], true), TypeFactory.keyword("any"));
    };
    CloneJoiner.array = (input, arrow) => ts.factory.createCallExpression(ts.factory.createPropertyAccessExpression(input, "map"), undefined, [arrow]);
})(CloneJoiner || (CloneJoiner = {}));
//# sourceMappingURL=CloneJoiner.js.map