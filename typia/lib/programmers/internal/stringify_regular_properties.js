import ts from "typescript";
import { TemplateFactory } from "../../factories/TemplateFactory";
import { ValueFactory } from "../../factories/ValueFactory";
export const stringify_regular_properties = (regular, dynamic) => {
    const output = [];
    regular.sort((x, y) => sequence(x.meta) - sequence(y.meta));
    regular.forEach((entry, index) => {
        const key = entry.key.getSoleLiteral();
        const base = [
            ts.factory.createStringLiteral(`${JSON.stringify(key)}:`),
            entry.expression,
        ];
        if (index !== regular.length - 1 || dynamic.length !== 0)
            base.push(ts.factory.createStringLiteral(`,`));
        const empty = (entry.meta.isRequired() === false &&
            entry.meta.nullable === false &&
            entry.meta.size() === 0) ||
            (entry.meta.functional &&
                entry.meta.nullable === false &&
                entry.meta.size() === 1);
        if (empty === true)
            return;
        else if (entry.meta.isRequired() === false ||
            entry.meta.functional === true ||
            entry.meta.any === true)
            output.push(ts.factory.createConditionalExpression((() => {
                const conditions = [];
                if (entry.meta.isRequired() === false || entry.meta.any)
                    conditions.push(ts.factory.createStrictEquality(ts.factory.createIdentifier("undefined"), entry.input));
                if (entry.meta.functional || entry.meta.any)
                    conditions.push(ts.factory.createStrictEquality(ts.factory.createStringLiteral("function"), ValueFactory.TYPEOF(entry.input)));
                return conditions.length === 1
                    ? conditions[0]
                    : conditions.reduce((x, y) => ts.factory.createLogicalOr(x, y));
            })(), undefined, ts.factory.createStringLiteral(""), undefined, TemplateFactory.generate(base)));
        else
            output.push(...base);
    });
    return output;
};
const sequence = (meta) => meta.any || !meta.isRequired() || meta.functional ? 0 : 1;
//# sourceMappingURL=stringify_regular_properties.js.map