import ts from "typescript";
import { IdentifierFactory } from "../../factories/IdentifierFactory";
import { StatementFactory } from "../../factories/StatementFactory";
import { check_everything } from "./check_everything";
import { metadata_to_pattern } from "./metadata_to_pattern";
export const check_dynamic_properties = (props) => (importer) => (input, regular, dynamic) => {
    const length = IdentifierFactory.access(ts.factory.createCallExpression(ts.factory.createIdentifier("Object.keys"), undefined, [input]))("length");
    const left = props.equals === true && dynamic.length === 0
        ? props.undefined === true ||
            regular.every((r) => r.meta.isRequired())
            ? ts.factory.createStrictEquality(ts.factory.createNumericLiteral(regular.filter((r) => r.meta.isRequired()).length), length)
            : ts.factory.createCallExpression(importer.use("is_between"), [], [
                length,
                ts.factory.createNumericLiteral(regular.filter((r) => r.meta.isRequired())
                    .length),
                ts.factory.createNumericLiteral(regular.length),
            ])
        : null;
    if (props.undefined === false &&
        left !== null &&
        regular.every((r) => r.meta.isRequired()))
        return left;
    const criteria = props.entries
        ? ts.factory.createCallExpression(props.entries, undefined, [
            ts.factory.createCallExpression(ts.factory.createIdentifier("Object.keys"), undefined, [input]),
            check_dynamic_property(props)(input, regular, dynamic),
        ])
        : ts.factory.createCallExpression(IdentifierFactory.access(ts.factory.createCallExpression(ts.factory.createIdentifier("Object.keys"), undefined, [input]))(props.assert ? "every" : "map"), undefined, [check_dynamic_property(props)(input, regular, dynamic)]);
    const right = (props.halt || ((elem) => elem))(props.assert ? criteria : check_everything(criteria));
    return left
        ? (props.undefined
            ? ts.factory.createLogicalOr
            : ts.factory.createLogicalAnd)(left, right)
        : right;
};
const check_dynamic_property = (props) => (input, regular, dynamic) => {
    const key = ts.factory.createIdentifier("key");
    const value = ts.factory.createIdentifier("value");
    const statements = [];
    const add = (exp, output) => statements.push(ts.factory.createIfStatement(exp, ts.factory.createReturnStatement(output)));
    if (props.equals === true && regular.length)
        add(is_regular_property(regular), props.positive);
    statements.push(StatementFactory.constant("value", ts.factory.createElementAccessExpression(input, key)));
    if (props.undefined === true)
        add(ts.factory.createStrictEquality(ts.factory.createIdentifier("undefined"), value), props.positive);
    for (const entry of dynamic)
        add(ts.factory.createCallExpression(ts.factory.createIdentifier(`RegExp(/${metadata_to_pattern(true)(entry.key)}/).test`), undefined, [key]), entry.expression);
    const block = ts.factory.createBlock([
        ...statements,
        ts.factory.createReturnStatement(props.equals === true
            ? props.superfluous(value)
            : props.positive),
    ], true);
    return ts.factory.createArrowFunction(undefined, undefined, [IdentifierFactory.parameter("key")], undefined, undefined, block);
};
const is_regular_property = (regular) => ts.factory.createCallExpression(IdentifierFactory.access(ts.factory.createArrayLiteralExpression(regular.map((entry) => ts.factory.createStringLiteral(entry.key.getSoleLiteral()))))("some"), undefined, [
    ts.factory.createArrowFunction(undefined, undefined, [IdentifierFactory.parameter("prop")], undefined, undefined, ts.factory.createStrictEquality(ts.factory.createIdentifier("key"), ts.factory.createIdentifier("prop"))),
]);
//# sourceMappingURL=check_dynamic_properties.js.map