import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { ValueFactory } from "../factories/ValueFactory";
import { UnionExplorer } from "./helpers/UnionExplorer";
import { feature_object_entries } from "./internal/feature_object_entries";
export var FeatureProgrammer;
(function (FeatureProgrammer) {
    FeatureProgrammer.write = (project) => (config) => (importer) => (type, name) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const [collection, meta] = config.initializer(project)(type);
        const output = config.decoder()(ValueFactory.INPUT(), meta, {
            tracable: config.path || config.trace,
            source: "top",
            from: "top",
            postfix: '""',
        }, [], []);
        const functions = {
            objects: ((_c = (_b = (_a = config.generator).objects) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : FeatureProgrammer.write_object_functions(config)(importer))(collection),
            unions: ((_f = (_e = (_d = config.generator).unions) === null || _e === void 0 ? void 0 : _e.call(_d)) !== null && _f !== void 0 ? _f : FeatureProgrammer.write_union_functions(config))(collection),
            arrays: config.generator.arrays()(collection),
            tuples: config.generator.tuples()(collection),
        };
        const added = ((_g = config.addition) !== null && _g !== void 0 ? _g : (() => []))(collection);
        return ts.factory.createArrowFunction(undefined, undefined, FeatureProgrammer.parameterDeclarations(config)(config.types.input(type, name))(ValueFactory.INPUT()), config.types.output(type, name), undefined, ts.factory.createBlock([
            ...added,
            ...functions.objects.filter((_, i) => importer.hasLocal(`${config.prefix}o${i}`)),
            ...functions.unions.filter((_, i) => importer.hasLocal(`${config.prefix}u${i}`)),
            ...functions.arrays.filter((_, i) => importer.hasLocal(`${config.prefix}a${i}`)),
            ...functions.tuples.filter((_, i) => importer.hasLocal(`${config.prefix}t${i}`)),
            ...(ts.isBlock(output)
                ? output.statements
                : [ts.factory.createReturnStatement(output)]),
        ], true));
    };
    FeatureProgrammer.write_object_functions = (config) => (importer) => (collection) => collection
        .objects()
        .map((obj, i) => {
        var _a;
        return StatementFactory.constant(`${config.prefix}o${i}`, ts.factory.createArrowFunction(undefined, undefined, FeatureProgrammer.parameterDeclarations(config)(TypeFactory.keyword("any"))(ValueFactory.INPUT()), (_a = config.objector.type) !== null && _a !== void 0 ? _a : TypeFactory.keyword("any"), undefined, config.objector.joiner(ts.factory.createIdentifier("input"), feature_object_entries(config)(importer)(obj)(ts.factory.createIdentifier("input")), obj)));
    });
    FeatureProgrammer.write_union_functions = (config) => (collection) => collection
        .unions()
        .map((union, i) => StatementFactory.constant(`${config.prefix}u${i}`, write_union(config)(union)));
    const write_union = (config) => {
        const explorer = UnionExplorer.object(config);
        const input = ValueFactory.INPUT();
        return (meta) => ts.factory.createArrowFunction(undefined, undefined, FeatureProgrammer.parameterDeclarations(config)(TypeFactory.keyword("any"))(ValueFactory.INPUT()), TypeFactory.keyword("any"), undefined, explorer(input, meta, {
            tracable: config.path || config.trace,
            source: "function",
            from: "object",
            postfix: "",
        }, [], []));
    };
    FeatureProgrammer.decode_array = (config) => (importer) => (combiner) => {
        const rand = importer.increment().toString();
        const tail = config.path || config.trace
            ? [
                IdentifierFactory.parameter("_index" + rand, TypeFactory.keyword("number")),
            ]
            : [];
        return (input, array, explore, metaTags, jsDocTags) => {
            var _a;
            const arrow = ts.factory.createArrowFunction(undefined, undefined, [
                IdentifierFactory.parameter("elem", TypeFactory.keyword("any")),
                ...tail,
            ], undefined, undefined, config.decoder()(ValueFactory.INPUT("elem"), array.value, {
                tracable: explore.tracable,
                source: explore.source,
                from: "array",
                postfix: FeatureProgrammer.index((_a = explore.start) !== null && _a !== void 0 ? _a : null)(explore.postfix)(rand),
            }, metaTags, jsDocTags));
            return combiner(input, arrow, metaTags, jsDocTags);
        };
    };
    FeatureProgrammer.decode_object = (config) => (importer) => (input, obj, explore) => ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(`${config.prefix}o${obj.index}`)), undefined, FeatureProgrammer.argumentsArray(config)(explore)(input));
    FeatureProgrammer.index = (start) => (prev) => (rand) => {
        const tail = start !== null
            ? `"[" + (${start} + _index${rand}) + "]"`
            : `"[" + _index${rand} + "]"`;
        if (prev === "")
            return tail;
        else if (prev[prev.length - 1] === `"`)
            return prev.substring(0, prev.length - 1) + tail.substring(1);
        return prev + ` + ${tail}`;
    };
    FeatureProgrammer.argumentsArray = (config) => (explore) => {
        const tail = config.path === false && config.trace === false
            ? []
            : config.path === true && config.trace === true
                ? [
                    ts.factory.createIdentifier(explore.postfix
                        ? `_path + ${explore.postfix}`
                        : "_path"),
                    explore.source === "function"
                        ? ts.factory.createIdentifier(`${explore.tracable} && _exceptionable`)
                        : explore.tracable
                            ? ts.factory.createTrue()
                            : ts.factory.createFalse(),
                ]
                : config.path === true
                    ? [
                        ts.factory.createIdentifier(explore.postfix
                            ? `_path + ${explore.postfix}`
                            : "_path"),
                    ]
                    : [
                        explore.source === "function"
                            ? ts.factory.createIdentifier(`${explore.tracable} && _exceptionable`)
                            : explore.tracable
                                ? ts.factory.createTrue()
                                : ts.factory.createFalse(),
                    ];
        return (input) => [input, ...tail];
    };
    FeatureProgrammer.parameterDeclarations = (props) => (type) => {
        const tail = [];
        if (props.path)
            tail.push(IdentifierFactory.parameter("_path", TypeFactory.keyword("string")));
        if (props.trace)
            tail.push(IdentifierFactory.parameter("_exceptionable", TypeFactory.keyword("boolean"), ts.factory.createTrue()));
        return (input) => [
            IdentifierFactory.parameter(input, type),
            ...tail,
        ];
    };
})(FeatureProgrammer || (FeatureProgrammer = {}));
//# sourceMappingURL=FeatureProgrammer.js.map