import ts from "typescript";
import { IdentifierFactory } from "../../factories/IdentifierFactory";
export const check_string_tags = (importer) => (tagList) => (input) => {
    const conditions = [];
    for (const tag of tagList)
        if (tag.kind === "format")
            conditions.push([
                tag,
                ts.factory.createCallExpression(importer.use(`is_${tag.value}`), undefined, [input]),
            ]);
        else if (tag.kind === "pattern")
            conditions.push([
                tag,
                ts.factory.createCallExpression(ts.factory.createIdentifier(`RegExp(/${tag.value}/).test`), undefined, [input]),
            ]);
        else if (tag.kind === "length")
            conditions.push([
                tag,
                ts.factory.createStrictEquality(ts.factory.createNumericLiteral(tag.value), IdentifierFactory.access(input)("length")),
            ]);
        else if (tag.kind === "minLength")
            conditions.push([
                tag,
                ts.factory.createLessThanEquals(ts.factory.createNumericLiteral(tag.value), IdentifierFactory.access(input)("length")),
            ]);
        else if (tag.kind === "maxLength")
            conditions.push([
                tag,
                ts.factory.createGreaterThanEquals(ts.factory.createNumericLiteral(tag.value), IdentifierFactory.access(input)("length")),
            ]);
    return conditions.map(([tag, expression]) => ({
        expected: `string (@${tag.kind} ${tag.value})`,
        expression,
    }));
};
//# sourceMappingURL=check_string_tags.js.map