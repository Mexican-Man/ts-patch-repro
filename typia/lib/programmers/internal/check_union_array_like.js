import ts from "typescript";
import { IdentifierFactory } from "../../factories/IdentifierFactory";
import { StatementFactory } from "../../factories/StatementFactory";
import { TypeFactory } from "../../factories/TypeFactory";
import { MetadataArray } from "../../metadata/MetadataArray";
import { MetadataTuple } from "../../metadata/MetadataTuple";
export const check_union_array_like = (accessor) => (props) => (parameters) => (input, origins, explore, tags, jsDocTags) => {
    const targets = origins.map(accessor.transform);
    if (targets.length === 1)
        return ts.factory.createArrowFunction(undefined, undefined, parameters, undefined, undefined, props.decoder(accessor.array(input), targets[0], explore, tags, jsDocTags));
    const array = ts.factory.createIdentifier("array");
    const top = ts.factory.createIdentifier("top");
    const statements = [];
    const tupleList = targets.filter((t) => t instanceof MetadataTuple);
    const arrayList = targets.filter((t) => t instanceof MetadataArray);
    const predicate = (meta) => ts.factory.createArrayLiteralExpression([
        ts.factory.createArrowFunction(undefined, undefined, [
            IdentifierFactory.parameter("top", meta instanceof MetadataArray
                ? TypeFactory.keyword("any")
                : ts.factory.createTypeReferenceNode("any[]")),
        ], TypeFactory.keyword("any"), undefined, props.checker(ts.factory.createIdentifier("top"), accessor.element(meta), Object.assign(Object.assign({}, explore), { tracable: false, postfix: meta instanceof MetadataArray
                ? `"[0]"`
                : "" }), tags, jsDocTags, array)),
        ts.factory.createArrowFunction(undefined, undefined, [
            IdentifierFactory.parameter("entire", ts.factory.createTypeReferenceNode("any[]")),
        ], TypeFactory.keyword("any"), undefined, props.decoder(ts.factory.createIdentifier("entire"), meta, Object.assign(Object.assign({}, explore), { tracable: true }), tags, jsDocTags)),
    ], true);
    const iterate = (init) => (from) => (stmt) => ts.factory.createForOfStatement(undefined, ts.factory.createVariableDeclarationList([ts.factory.createVariableDeclaration(init)], ts.NodeFlags.Const), from, stmt);
    if (tupleList.length)
        statements.push(StatementFactory.constant("array", accessor.array(input)), StatementFactory.constant("tuplePredicators", ts.factory.createArrayLiteralExpression(tupleList.map((x) => predicate(x)), true)), iterate("pred")(ts.factory.createIdentifier("tuplePredicators"))(ts.factory.createIfStatement(ts.factory.createCallExpression(ts.factory.createIdentifier("pred[0]"), undefined, [array]), ts.factory.createReturnStatement(ts.factory.createCallExpression(ts.factory.createIdentifier(`pred[1]`), undefined, [array])))));
    if (arrayList.length) {
        if (tupleList.length === 0)
            statements.push(StatementFactory.constant("array", accessor.array(input)));
        statements.push(StatementFactory.constant("top", accessor.front(input)), ts.factory.createIfStatement(ts.factory.createStrictEquality(ts.factory.createNumericLiteral(0), accessor.size(input)), ts.isReturnStatement(props.empty)
            ? props.empty
            : ts.factory.createReturnStatement(props.empty)), StatementFactory.constant("arrayPredicators", ts.factory.createArrayLiteralExpression(arrayList.map((x) => predicate(x)), true)), StatementFactory.constant("passed", ts.factory.createCallExpression(IdentifierFactory.access(ts.factory.createIdentifier("arrayPredicators"))("filter"), undefined, [
            ts.factory.createArrowFunction(undefined, undefined, [IdentifierFactory.parameter("pred")], undefined, undefined, ts.factory.createCallExpression(ts.factory.createIdentifier("pred[0]"), undefined, [top])),
        ])), ts.factory.createIfStatement(ts.factory.createStrictEquality(ts.factory.createNumericLiteral(1), ts.factory.createIdentifier("passed.length")), ts.factory.createReturnStatement(ts.factory.createCallExpression(ts.factory.createIdentifier(`passed[0][1]`), undefined, [array])), ts.factory.createIfStatement(ts.factory.createLessThan(ts.factory.createNumericLiteral(1), ts.factory.createIdentifier("passed.length")), iterate("pred")(ts.factory.createIdentifier("passed"))(ts.factory.createIfStatement(ts.factory.createCallExpression(IdentifierFactory.access(array)("every"), undefined, [
            ts.factory.createArrowFunction(undefined, undefined, [
                IdentifierFactory.parameter("value", TypeFactory.keyword("any")),
            ], undefined, undefined, ts.factory.createStrictEquality(props.success, ts.factory.createCallExpression(ts.factory.createIdentifier("pred[0]"), undefined, [
                ts.factory.createIdentifier("value"),
            ]))),
        ]), ts.factory.createReturnStatement(ts.factory.createCallExpression(ts.factory.createIdentifier(`pred[1]`), undefined, [ts.factory.createIdentifier("array")])))))));
    }
    statements.push(props.failure(input, `(${targets
        .map((t) => accessor.name(t, accessor.element(t)))
        .join(" | ")})`, explore));
    return ts.factory.createArrowFunction(undefined, undefined, parameters, undefined, undefined, ts.factory.createBlock(statements, true));
};
//# sourceMappingURL=check_union_array_like.js.map