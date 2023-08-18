import ts from "typescript";
import { IdentifierFactory } from "../../factories/IdentifierFactory";
import { TemplateFactory } from "../../factories/TemplateFactory";
import { stringify_dynamic_properties } from "../internal/stringify_dynamic_properties";
import { stringify_regular_properties } from "../internal/stringify_regular_properties";
export var StringifyJoiner;
(function (StringifyJoiner) {
    StringifyJoiner.object = (importer) => (_input, entries) => {
        if (entries.length === 0)
            return ts.factory.createStringLiteral("{}");
        const regular = entries.filter((entry) => entry.key.isSoleLiteral());
        const dynamic = entries.filter((entry) => !entry.key.isSoleLiteral());
        const expressions = [
            ...stringify_regular_properties(regular, dynamic),
            ...(dynamic.length
                ? [
                    stringify_dynamic_properties(dynamic, regular.map((r) => r.key.getSoleLiteral())),
                ]
                : []),
        ];
        const filtered = (regular.length &&
            regular[regular.length - 1].meta.isRequired() &&
            dynamic.length === 0) ||
            (regular.length === 0 && dynamic.length)
            ? expressions
            : [
                ts.factory.createCallExpression(importer.use("tail"), undefined, [TemplateFactory.generate(expressions)]),
            ];
        return TemplateFactory.generate([
            ts.factory.createStringLiteral(`{`),
            ...filtered,
            ts.factory.createStringLiteral(`}`),
        ]);
    };
    StringifyJoiner.array = (input, arrow) => TemplateFactory.generate([
        ts.factory.createStringLiteral(`[`),
        ts.factory.createCallExpression(ts.factory.createPropertyAccessExpression(ts.factory.createCallExpression(IdentifierFactory.access(input)("map"), undefined, [arrow]), ts.factory.createIdentifier("join")), undefined, [ts.factory.createStringLiteral(`,`)]),
        ts.factory.createStringLiteral(`]`),
    ]);
    StringifyJoiner.tuple = (children, rest) => {
        if (children.length === 0)
            return ts.factory.createStringLiteral("[]");
        if (rest === null &&
            children.every((child) => ts.isStringLiteral(child)))
            return ts.factory.createStringLiteral("[" +
                children
                    .map((child) => child.text)
                    .join(",") +
                "]");
        const elements = [ts.factory.createStringLiteral(`[`)];
        children.forEach((child, i) => {
            elements.push(child);
            if (i !== children.length - 1)
                elements.push(ts.factory.createStringLiteral(`,`));
        });
        if (rest !== null)
            elements.push(rest);
        elements.push(ts.factory.createStringLiteral(`]`));
        return TemplateFactory.generate(elements);
    };
})(StringifyJoiner || (StringifyJoiner = {}));
//# sourceMappingURL=StringifyJoinder.js.map