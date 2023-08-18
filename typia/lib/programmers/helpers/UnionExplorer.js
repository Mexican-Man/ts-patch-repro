import ts from "typescript";
import { ExpressionFactory } from "../../factories/ExpressionFactory";
import { IdentifierFactory } from "../../factories/IdentifierFactory";
import { Metadata } from "../../metadata/Metadata";
import { MetadataArray } from "../../metadata/MetadataArray";
import { MetadataTuple } from "../../metadata/MetadataTuple";
import { check_union_array_like } from "../internal/check_union_array_like";
import { UnionPredicator } from "./UnionPredicator";
export var UnionExplorer;
(function (UnionExplorer) {
    UnionExplorer.object = (config, level = 0) => (input, targets, explore, tags, jsDocTags) => {
        if (targets.length === 1)
            return config.objector.decoder()(input, targets[0], explore, tags, jsDocTags);
        const expected = `(${targets
            .map((t) => t.name)
            .join(" | ")})`;
        const specList = UnionPredicator.object(targets);
        if (specList.length === 0) {
            const condition = config.objector.unionizer(input, targets, Object.assign(Object.assign({}, explore), { tracable: false }), tags, jsDocTags);
            return config.objector.full
                ? config.objector.full(condition)(input, expected, explore)
                : condition;
        }
        const remained = targets.filter((t) => specList.find((s) => s.object === t) === undefined);
        const conditions = specList
            .filter((spec) => spec.property.key.getSoleLiteral() !== null)
            .map((spec) => {
            const key = spec.property.key.getSoleLiteral();
            const accessor = IdentifierFactory.access(input)(key);
            const pred = spec.neighbour
                ? config.objector.checker()(accessor, spec.property.value, Object.assign(Object.assign({}, explore), { tracable: false, postfix: IdentifierFactory.postfix(key) }), tags, jsDocTags)
                : (config.objector.required || ((exp) => exp))(ExpressionFactory.isRequired(accessor));
            return ts.factory.createIfStatement((config.objector.is || ((exp) => exp))(pred), ts.factory.createReturnStatement(config.objector.decoder()(input, spec.object, explore, tags, jsDocTags)));
        });
        return ts.factory.createCallExpression(ts.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, ts.factory.createBlock([
            ...conditions,
            remained.length
                ? ts.factory.createReturnStatement(UnionExplorer.object(config, level + 1)(input, remained, explore, tags, jsDocTags))
                : config.objector.failure(input, expected, explore),
        ], true)), undefined, undefined);
    };
    UnionExplorer.tuple = (props) => check_union_array_like({
        transform: (x) => x,
        element: (x) => x,
        size: null,
        front: (input) => input,
        array: (input) => input,
        name: (t) => t.name,
    })(props);
    UnionExplorer.array = (props) => check_union_array_like({
        transform: (x) => x,
        element: (x) => x.value,
        size: (input) => IdentifierFactory.access(input)("length"),
        front: (input) => ts.factory.createElementAccessExpression(input, 0),
        array: (input) => input,
        name: (t) => t.name,
    })(props);
    UnionExplorer.array_or_tuple = (props) => check_union_array_like({
        transform: (x) => x,
        element: (x) => (x instanceof MetadataArray ? x.value : x),
        size: (input) => IdentifierFactory.access(input)("length"),
        front: (input) => ts.factory.createElementAccessExpression(input, 0),
        array: (input) => input,
        name: (m) => m.name,
    })(props);
    UnionExplorer.set = (props) => check_union_array_like({
        transform: (value) => MetadataArray.create({
            name: `Set<${value.getName()}>`,
            index: null,
            recursive: false,
            nullables: [],
            value,
        }),
        element: (array) => array.value,
        size: (input) => IdentifierFactory.access(input)("size"),
        front: (input) => IdentifierFactory.access(ts.factory.createCallExpression(IdentifierFactory.access(ts.factory.createCallExpression(IdentifierFactory.access(input)("values"), undefined, undefined))("next"), undefined, undefined))("value"),
        array: (input) => ts.factory.createArrayLiteralExpression([ts.factory.createSpreadElement(input)], false),
        name: (_m, e) => `Set<${e.getName()}>`,
    })(props);
    UnionExplorer.map = (props) => check_union_array_like({
        element: (array) => array.value.tuples[0].elements,
        size: (input) => IdentifierFactory.access(input)("size"),
        front: (input) => IdentifierFactory.access(ts.factory.createCallExpression(IdentifierFactory.access(ts.factory.createCallExpression(IdentifierFactory.access(input)("entries"), undefined, undefined))("next"), undefined, undefined))("value"),
        array: (input) => ts.factory.createArrayLiteralExpression([ts.factory.createSpreadElement(input)], false),
        name: (_m, [k, v]) => `Map<${k.getName()}, ${v.getName()}>`,
        transform: (m) => MetadataArray.create({
            name: `Map<${m.key.getName()}, ${m.value.getName()}>`,
            index: null,
            recursive: false,
            nullables: [],
            value: Metadata.create(Object.assign(Object.assign({}, Metadata.initialize()), { tuples: [
                    MetadataTuple.create({
                        name: `[${m.key.getName()}, ${m.value.getName()}]`,
                        index: null,
                        recursive: false,
                        nullables: [],
                        elements: [m.key, m.value],
                    }),
                ] })),
        }),
    })(props);
})(UnionExplorer || (UnionExplorer = {}));
//# sourceMappingURL=UnionExplorer.js.map