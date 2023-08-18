import ts from "typescript";
import { IdentifierFactory } from "../../factories/IdentifierFactory";
import { Escaper } from "../../utils/Escaper";
export const feature_object_entries = (config) => (importer) => (obj) => (input, from = "object") => obj.properties.map((prop) => {
    const sole = prop.key.getSoleLiteral();
    const propInput = sole === null
        ? ts.factory.createIdentifier("value")
        : Escaper.variable(sole)
            ? ts.factory.createPropertyAccessExpression(input, ts.factory.createIdentifier(sole))
            : ts.factory.createElementAccessExpression(input, ts.factory.createStringLiteral(sole));
    return {
        input: propInput,
        key: prop.key,
        meta: prop.value,
        expression: config.decoder()(propInput, prop.value, {
            tracable: config.path || config.trace,
            source: "function",
            from,
            postfix: sole !== null
                ? IdentifierFactory.postfix(sole)
                : (() => {
                    importer.use("join");
                    return `$join(key)`;
                })(),
        }, prop.tags, prop.jsDocTags),
    };
});
//# sourceMappingURL=feature_object_entries.js.map