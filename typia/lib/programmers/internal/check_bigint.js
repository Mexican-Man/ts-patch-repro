import ts from "typescript";
import { check_custom } from "./check_custom";
export const check_bigint = (importer) => (metaTags) => (jsDocTag) => (input) => {
    var _a, _b;
    const entries = [];
    for (const tag of metaTags) {
        if (tag.kind === "multipleOf")
            entries.push([
                tag,
                ts.factory.createStrictEquality(cast(0), ts.factory.createModulo(input, cast(tag.value))),
            ]);
        else if (tag.kind === "step") {
            const modulo = ts.factory.createModulo(input, cast(tag.value));
            const minimum = (_b = (_a = metaTags.find((tag) => tag.kind === "minimum" ||
                tag.kind === "exclusiveMinimum")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : undefined;
            entries.push([
                tag,
                ts.factory.createStrictEquality(cast(0), minimum !== undefined
                    ? ts.factory.createSubtract(modulo, cast(minimum))
                    : modulo),
            ]);
        }
        else if (tag.kind === "minimum")
            entries.push([
                tag,
                ts.factory.createLessThanEquals(cast(tag.value), input),
            ]);
        else if (tag.kind === "maximum")
            entries.push([
                tag,
                ts.factory.createGreaterThanEquals(cast(tag.value), input),
            ]);
        else if (tag.kind === "exclusiveMinimum")
            entries.push([
                tag,
                ts.factory.createLessThan(cast(tag.value), input),
            ]);
        else if (tag.kind === "exclusiveMaximum")
            entries.push([
                tag,
                ts.factory.createGreaterThan(cast(tag.value), input),
            ]);
    }
    return {
        expression: ts.factory.createStrictEquality(ts.factory.createStringLiteral("bigint"), ts.factory.createTypeOfExpression(input)),
        tags: [
            ...entries.map(([tag, expression]) => ({
                expected: `bigint (@${tag.kind} ${tag.value})`,
                expression,
            })),
            ...check_custom("bigint")(importer)(jsDocTag)(input),
        ],
    };
};
const cast = (value) => ts.factory.createIdentifier(`${Math.floor(value)}n`);
//# sourceMappingURL=check_bigint.js.map