import ts from "typescript";
import { IdentifierFactory } from "../../factories/IdentifierFactory";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { metadata_to_pattern } from "../internal/metadata_to_pattern";
import { prune_object_properties } from "../internal/prune_object_properties";
export var PruneJoiner;
(function (PruneJoiner) {
    PruneJoiner.object = (input, entries, obj) => {
        const regular = entries.filter((entry) => entry.key.isSoleLiteral());
        const dynamic = entries.filter((entry) => !entry.key.isSoleLiteral());
        const statements = ArrayUtil.flat(regular.map((entry) => ts.isBlock(entry.expression)
            ? [...entry.expression.statements]
            : [ts.factory.createExpressionStatement(entry.expression)]));
        if (dynamic.length)
            statements.push(ts.factory.createExpressionStatement(iterate_dynamic_properties({ regular, dynamic })(input)));
        statements.push(prune_object_properties(obj));
        return ts.factory.createBlock(statements, true);
    };
    PruneJoiner.array = (input, arrow) => ts.factory.createCallExpression(IdentifierFactory.access(input)("forEach"), undefined, [arrow]);
    PruneJoiner.tuple = (children, rest) => {
        const entire = [...children];
        if (rest !== null)
            entire.push(rest);
        const statements = ArrayUtil.flat(entire.map((elem) => ts.isBlock(elem)
            ? [...elem.statements]
            : [ts.factory.createExpressionStatement(elem)]));
        return ts.factory.createBlock(statements, true);
    };
})(PruneJoiner || (PruneJoiner = {}));
const iterate_dynamic_properties = (props) => (input) => ts.factory.createCallExpression(IdentifierFactory.access(ts.factory.createCallExpression(ts.factory.createIdentifier("Object.entries"), undefined, [input]))("forEach"), undefined, [
    ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter(ts.factory.createArrayBindingPattern(["key", "value"].map((l) => ts.factory.createBindingElement(undefined, undefined, ts.factory.createIdentifier(l), undefined)))),
    ], undefined, undefined, ts.factory.createBlock([
        ts.factory.createIfStatement(ts.factory.createStrictEquality(ts.factory.createIdentifier("undefined"), ts.factory.createIdentifier("value")), ts.factory.createReturnStatement()),
        ...props.regular.map(({ key }) => ts.factory.createIfStatement(ts.factory.createStrictEquality(ts.factory.createStringLiteral(key.getSoleLiteral()), ts.factory.createIdentifier("key")), ts.factory.createReturnStatement())),
        ...props.dynamic.map((dynamic) => ts.factory.createIfStatement(ts.factory.createCallExpression(ts.factory.createIdentifier(`RegExp(/${metadata_to_pattern(true)(dynamic.key)}/).test`), undefined, [ts.factory.createIdentifier("key")]), ts.isBlock(dynamic.expression)
            ? dynamic.expression
            : ts.factory.createBlock([
                ts.factory.createExpressionStatement(dynamic.expression),
            ]))),
    ], true)),
]);
//# sourceMappingURL=PruneJoiner.js.map