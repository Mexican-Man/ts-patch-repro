import ts from "typescript";
import { OptionPredicator } from "../helpers/OptionPredicator";
import { check_custom } from "./check_custom";
export const check_number = (project, numeric) => (importer) => (metaTags) => (jsDocTag) => (input) => {
    var _a, _b;
    const entries = [];
    for (const tag of metaTags)
        if (tag.kind === "type") {
            entries.push([
                tag,
                ts.factory.createStrictEquality(ts.factory.createCallExpression(ts.factory.createIdentifier("parseInt"), undefined, [input]), input),
            ]);
            if (tag.value === "uint")
                entries.push([
                    tag,
                    ts.factory.createLessThanEquals(ts.factory.createNumericLiteral(0), input),
                ]);
        }
        else if (tag.kind === "multipleOf")
            entries.push([
                tag,
                ts.factory.createStrictEquality(ts.factory.createNumericLiteral(0), ts.factory.createModulo(input, ts.factory.createNumericLiteral(tag.value))),
            ]);
        else if (tag.kind === "step") {
            const modulo = ts.factory.createModulo(input, ts.factory.createNumericLiteral(tag.value));
            const minimum = (_b = (_a = metaTags.find((tag) => tag.kind === "minimum" ||
                tag.kind === "exclusiveMinimum")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : undefined;
            entries.push([
                tag,
                ts.factory.createStrictEquality(ts.factory.createNumericLiteral(0), minimum !== undefined
                    ? ts.factory.createSubtract(modulo, ts.factory.createNumericLiteral(minimum))
                    : modulo),
            ]);
        }
        else if (tag.kind === "minimum")
            entries.push([
                tag,
                ts.factory.createLessThanEquals(ts.factory.createNumericLiteral(tag.value), input),
            ]);
        else if (tag.kind === "maximum")
            entries.push([
                tag,
                ts.factory.createGreaterThanEquals(ts.factory.createNumericLiteral(tag.value), input),
            ]);
        else if (tag.kind === "exclusiveMinimum")
            entries.push([
                tag,
                ts.factory.createLessThan(ts.factory.createNumericLiteral(tag.value), input),
            ]);
        else if (tag.kind === "exclusiveMaximum")
            entries.push([
                tag,
                ts.factory.createGreaterThan(ts.factory.createNumericLiteral(tag.value), input),
            ]);
    return {
        expression: is_number(project, numeric)(metaTags)(input),
        tags: [
            ...entries.map(([tag, expression]) => ({
                expected: `number (@${tag.kind} ${tag.value})`,
                expression,
            })),
            ...check_custom("number")(importer)(jsDocTag)(input),
        ],
    };
};
const is_number = ({ options }, numeric) => (metaTags) => (input) => {
    const conditions = [
        ts.factory.createStrictEquality(ts.factory.createStringLiteral("number"), ts.factory.createTypeOfExpression(input)),
    ];
    const finite = (!!metaTags.find((tag) => tag.kind === "minimum" || tag.kind === "exclusiveMinimum") &&
        !!metaTags.find((tag) => tag.kind === "maximum" ||
            tag.kind === "exclusiveMaximum")) ||
        !!metaTags.find((tag) => tag.kind === "step" || tag.kind === "multipleOf");
    if (numeric === true && finite === false)
        if (OptionPredicator.finite(options))
            conditions.push(ts.factory.createCallExpression(ts.factory.createIdentifier("Number.isFinite"), undefined, [input]));
        else if (OptionPredicator.numeric(options))
            conditions.push(ts.factory.createLogicalNot(ts.factory.createCallExpression(ts.factory.createIdentifier("Number.isNaN"), undefined, [input])));
    return conditions.length === 1
        ? conditions[0]
        : conditions.reduce((x, y) => ts.factory.createLogicalAnd(x, y));
};
//# sourceMappingURL=check_number.js.map