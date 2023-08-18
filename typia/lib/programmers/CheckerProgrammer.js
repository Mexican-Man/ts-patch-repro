import ts from "typescript";
import { ExpressionFactory } from "../factories/ExpressionFactory";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { MetadataCollection } from "../factories/MetadataCollection";
import { MetadataFactory } from "../factories/MetadataFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { ValueFactory } from "../factories/ValueFactory";
import { MetadataTuple } from "../metadata/MetadataTuple";
import { FeatureProgrammer } from "./FeatureProgrammer";
import { AtomicPredicator } from "./helpers/AtomicPredicator";
import { OptionPredicator } from "./helpers/OptionPredicator";
import { UnionExplorer } from "./helpers/UnionExplorer";
import { check_array } from "./internal/check_array";
import { check_array_length } from "./internal/check_array_length";
import { check_bigint } from "./internal/check_bigint";
import { check_native } from "./internal/check_native";
import { check_number } from "./internal/check_number";
import { check_string } from "./internal/check_string";
import { check_template } from "./internal/check_template";
import { decode_union_object } from "./internal/decode_union_object";
import { wrap_metadata_rest_tuple } from "./internal/wrap_metadata_rest_tuple";
export var CheckerProgrammer;
(function (CheckerProgrammer) {
    CheckerProgrammer.write = (project) => (config) => (importer) => FeatureProgrammer.write(project)(configure(project)(config)(importer))(importer);
    CheckerProgrammer.write_object_functions = (project) => (config) => (importer) => FeatureProgrammer.write_object_functions(configure(project)(config)(importer))(importer);
    CheckerProgrammer.write_union_functions = (project) => (config) => (importer) => FeatureProgrammer.write_union_functions(configure(project)(Object.assign(Object.assign({}, config), { numeric: false }))(importer));
    CheckerProgrammer.write_array_functions = (project) => (config) => (importer) => (collection) => collection
        .arrays()
        .filter((a) => a.recursive)
        .map((array, i) => StatementFactory.constant(`${config.prefix}a${i}`, ts.factory.createArrowFunction(undefined, undefined, FeatureProgrammer.parameterDeclarations(config)(TypeFactory.keyword("any"))(ts.factory.createIdentifier("input")), TypeFactory.keyword("any"), undefined, decode_array_inline(project)(config)(importer)(ts.factory.createIdentifier("input"), array, {
        tracable: config.trace,
        source: "function",
        from: "array",
        postfix: "",
    }, [], []))));
    CheckerProgrammer.write_tuple_functions = (project) => (config) => (importer) => (collection) => collection
        .tuples()
        .filter((t) => t.recursive)
        .map((tuple, i) => StatementFactory.constant(`${config.prefix}t${i}`, ts.factory.createArrowFunction(undefined, undefined, FeatureProgrammer.parameterDeclarations(config)(TypeFactory.keyword("any"))(ts.factory.createIdentifier("input")), TypeFactory.keyword("any"), undefined, decode_tuple_inline(project)(config)(importer)(ts.factory.createIdentifier("input"), tuple, {
        tracable: config.trace,
        source: "function",
        from: "array",
        postfix: "",
    }, [], []))));
    const configure = (project) => (config) => (importer) => {
        var _a;
        return ({
            types: {
                input: () => TypeFactory.keyword("any"),
                output: (type, name) => ts.factory.createTypePredicateNode(undefined, "input", ts.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type))),
            },
            trace: config.trace,
            path: config.path,
            prefix: config.prefix,
            initializer: ({ checker }) => (type) => {
                const collection = new MetadataCollection();
                const meta = MetadataFactory.analyze(checker)({
                    resolve: false,
                    constant: true,
                    absorb: true,
                })(collection)(type);
                return [collection, meta];
            },
            addition: config.addition,
            decoder: () => { var _a, _b; return (_b = (_a = config.decoder) === null || _a === void 0 ? void 0 : _a.call(config)) !== null && _b !== void 0 ? _b : CheckerProgrammer.decode(project)(config)(importer); },
            objector: {
                checker: () => { var _a, _b; return (_b = (_a = config.decoder) === null || _a === void 0 ? void 0 : _a.call(config)) !== null && _b !== void 0 ? _b : CheckerProgrammer.decode(project)(config)(importer); },
                decoder: () => CheckerProgrammer.decode_object(config)(importer),
                joiner: config.joiner.object,
                unionizer: config.equals
                    ? decode_union_object(CheckerProgrammer.decode_object(config)(importer))((input, obj, explore) => CheckerProgrammer.decode_object(config)(importer)(input, obj, Object.assign(Object.assign({}, explore), { tracable: true })))((_a = config.joiner.is) !== null && _a !== void 0 ? _a : ((expr) => expr))((value, expected) => ts.factory.createReturnStatement(config.joiner.failure(value, expected)))
                    : (input, targets, explore) => config.combiner(explore)("or")(input, targets.map((obj) => ({
                        expression: CheckerProgrammer.decode_object(config)(importer)(input, obj, explore),
                        combined: true,
                    })), `(${targets.map((t) => t.name).join(" | ")})`),
                failure: (value, expected) => ts.factory.createReturnStatement(config.joiner.failure(value, expected)),
                is: config.joiner.is,
                required: config.joiner.required,
                full: config.joiner.full,
                type: TypeFactory.keyword("boolean"),
            },
            generator: {
                unions: config.numeric
                    ? () => FeatureProgrammer.write_union_functions(configure(project)(Object.assign(Object.assign({}, config), { numeric: false }))(importer))
                    : undefined,
                arrays: () => CheckerProgrammer.write_array_functions(project)(config)(importer),
                tuples: () => CheckerProgrammer.write_tuple_functions(project)(config)(importer),
            },
        });
    };
    CheckerProgrammer.decode = (project) => (config) => (importer) => (input, meta, explore, metaTags, jsDocTags) => {
        if (meta.any)
            return config.success;
        const top = [];
        const binaries = [];
        const add = create_add(binaries)(input);
        const getConstantValue = (value) => typeof value === "string"
            ? ts.factory.createStringLiteral(value)
            : ts.factory.createIdentifier(value.toString());
        const checkOptional = meta.empty() || meta.isUnionBucket();
        if (checkOptional || meta.nullable)
            (meta.nullable ? add : create_add(top)(input))(meta.nullable, ValueFactory.NULL());
        if (checkOptional || !meta.isRequired())
            (meta.isRequired() ? create_add(top)(input) : add)(!meta.isRequired(), ValueFactory.UNDEFINED());
        if (meta.functional === true)
            if (OptionPredicator.functional(project.options) ||
                meta.size() !== 1)
                add(true, ts.factory.createStringLiteral("function"), ValueFactory.TYPEOF(input));
            else
                binaries.push({
                    combined: false,
                    expression: config.success,
                });
        for (const constant of meta.constants)
            if (AtomicPredicator.constant(meta)(constant.type))
                for (const val of constant.values)
                    add(true, getConstantValue(val));
        for (const type of meta.atomics)
            if (AtomicPredicator.atomic(meta)(type) === false)
                continue;
            else if (type === "number")
                binaries.push({
                    expression: config.atomist(explore)(check_number(project, config.numeric)(importer)(metaTags)(jsDocTags)(input))(input),
                    combined: false,
                });
            else if (type === "bigint")
                binaries.push({
                    expression: config.atomist(explore)(check_bigint(importer)(metaTags)(jsDocTags)(input))(input),
                    combined: false,
                });
            else if (type === "string")
                binaries.push({
                    expression: config.atomist(explore)(check_string(importer)(metaTags)(jsDocTags)(input))(input),
                    combined: false,
                });
            else
                add(true, ts.factory.createStringLiteral(type), ValueFactory.TYPEOF(input));
        if (meta.templates.length)
            if (AtomicPredicator.template(meta))
                binaries.push({
                    expression: config.atomist(explore)(check_template(importer)(metaTags)(jsDocTags)(meta.templates)(input))(input),
                    combined: false,
                });
        for (const native of meta.natives)
            binaries.push({
                expression: check_native(native)(input),
                combined: false,
            });
        const instances = [];
        const prepare = (pre, expected) => (body) => instances.push({
            pre,
            expected,
            body,
        });
        if (meta.sets.length) {
            const install = prepare(check_native("Set")(input), meta.sets
                .map((elem) => `Set<${elem.getName()}>`)
                .join(" | "));
            if (meta.sets.some((elem) => elem.any))
                install(null);
            else
                install(explore_sets(project)(config)(importer)(input, meta.sets, Object.assign(Object.assign({}, explore), { from: "array" }), [], []));
        }
        if (meta.maps.length) {
            const install = prepare(check_native("Map")(input), meta.maps
                .map(({ key, value }) => `Map<${key}, ${value}>`)
                .join(" | "));
            if (meta.maps.some((elem) => elem.key.any && elem.value.any))
                install(null);
            else
                install(explore_maps(project)(config)(importer)(input, meta.maps, Object.assign(Object.assign({}, explore), { from: "array" }), [], []));
        }
        if (meta.tuples.length + meta.arrays.length > 0) {
            const install = prepare(config.atomist(explore)(check_array(importer)(meta.tuples.length === 0 ? metaTags : [])(jsDocTags)(input))(input), [...meta.tuples, ...meta.arrays]
                .map((elem) => elem.name)
                .join(" | "));
            if (meta.arrays.length === 0)
                if (meta.tuples.length === 1)
                    install(decode_tuple(project)(config)(importer)(input, meta.tuples[0], Object.assign(Object.assign({}, explore), { from: "array" }), metaTags, jsDocTags));
                else
                    install(explore_tuples(project)(config)(importer)(input, meta.tuples, Object.assign(Object.assign({}, explore), { from: "array" }), metaTags, jsDocTags));
            else if (meta.arrays.some((elem) => elem.value.any))
                install(null);
            else if (meta.tuples.length === 0)
                if (meta.arrays.length === 1)
                    install(decode_array(project)(config)(importer)(input, meta.arrays[0], Object.assign(Object.assign({}, explore), { from: "array" }), metaTags, jsDocTags));
                else
                    install(explore_arrays(project)(config)(importer)(input, meta.arrays, Object.assign(Object.assign({}, explore), { from: "array" }), metaTags, jsDocTags));
            else
                install(explore_arrays_and_tuples(project)(config)(importer)(input, [...meta.tuples, ...meta.arrays], explore, metaTags, jsDocTags));
        }
        if (meta.objects.length > 0)
            prepare(ExpressionFactory.isObject({
                checkNull: true,
                checkArray: meta.objects.some((obj) => obj.properties.every((prop) => !prop.key.isSoleLiteral() ||
                    !prop.value.isRequired())),
            })(input), meta.objects.map((obj) => obj.name).join(" | "))(explore_objects(config)(importer)(input, meta, Object.assign(Object.assign({}, explore), { from: "object" })));
        if (instances.length) {
            const transformer = (merger) => (ins) => ins.body
                ? {
                    expression: merger(ins.pre, ins.body),
                    combined: true,
                }
                : {
                    expression: ins.pre,
                    combined: false,
                };
            if (instances.length === 1)
                binaries.push(transformer((pre, body) => config.combiner(explore)("and")(input, [pre, body].map((expression) => ({
                    expression,
                    combined: expression !== pre,
                })), meta.getName()))(instances[0]));
            else
                binaries.push({
                    expression: config.combiner(explore)("or")(input, instances.map(transformer(ts.factory.createLogicalAnd)), meta.getName()),
                    combined: true,
                });
        }
        return top.length && binaries.length
            ? config.combiner(explore)("and")(input, [
                ...top,
                {
                    expression: config.combiner(explore)("or")(input, binaries, meta.getName()),
                    combined: true,
                },
            ], meta.getName())
            : binaries.length
                ? config.combiner(explore)("or")(input, binaries, meta.getName())
                : config.success;
    };
    CheckerProgrammer.decode_object = (config) => (importer) => {
        const func = FeatureProgrammer.decode_object(config)(importer);
        return (input, obj, explore) => {
            obj.validated = true;
            return func(input, obj, explore);
        };
    };
    const decode_array = (project) => (config) => (importer) => (input, array, explore, metaTags, jsDocTags) => {
        if (array.recursive === false)
            return decode_array_inline(project)(config)(importer)(input, array, explore, metaTags, jsDocTags);
        explore = Object.assign(Object.assign({}, explore), { source: "function", from: "array" });
        return ts.factory.createLogicalOr(ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(`${config.prefix}a${array.index}`)), undefined, FeatureProgrammer.argumentsArray(config)(Object.assign(Object.assign({}, explore), { source: "function", from: "array" }))(input)), config.joiner.failure(input, array.name, explore));
    };
    const decode_array_inline = (project) => (config) => (importer) => FeatureProgrammer.decode_array({
        prefix: config.prefix,
        trace: config.trace,
        path: config.path,
        decoder: () => CheckerProgrammer.decode(project)(config)(importer),
    })(importer)(config.joiner.array);
    const decode_tuple = (project) => (config) => (importer) => (input, tuple, explore, tagList, jsDocTags) => {
        if (tuple.recursive === false)
            return decode_tuple_inline(project)(config)(importer)(input, tuple, explore, tagList, jsDocTags);
        explore = Object.assign(Object.assign({}, explore), { source: "function", from: "array" });
        return ts.factory.createLogicalOr(ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(`${config.prefix}t${tuple.index}`)), undefined, FeatureProgrammer.argumentsArray(config)(Object.assign(Object.assign({}, explore), { source: "function" }))(input)), config.joiner.failure(input, tuple.name, explore));
    };
    const decode_tuple_inline = (project) => (config) => (importer) => (input, tuple, explore, tagList, jsDocTags) => {
        const binaries = tuple.elements
            .filter((meta) => meta.rest === null)
            .map((meta, index) => CheckerProgrammer.decode(project)(config)(importer)(ts.factory.createElementAccessExpression(input, index), meta, Object.assign(Object.assign({}, explore), { from: "array", postfix: explore.postfix.length
                ? `${explore.postfix.slice(0, -1)}[${index}]"`
                : `"[${index}]"` }), tagList, jsDocTags));
        const rest = tuple.elements.length && tuple.elements.at(-1).rest !== null
            ? CheckerProgrammer.decode(project)(config)(importer)(ts.factory.createCallExpression(IdentifierFactory.access(input)("slice"), undefined, [
                ts.factory.createNumericLiteral(tuple.elements.length - 1),
            ]), wrap_metadata_rest_tuple(tuple.elements.at(-1).rest), Object.assign(Object.assign({}, explore), { start: tuple.elements.length - 1 }), tagList, jsDocTags)
            : null;
        const arrayLength = ts.factory.createPropertyAccessExpression(input, "length");
        return config.combiner(explore)("and")(input, [
            ...(rest === null
                ? tuple.elements.every((t) => t.optional === false)
                    ? [
                        {
                            combined: false,
                            expression: ts.factory.createStrictEquality(arrayLength, ts.factory.createNumericLiteral(tuple.elements.length)),
                        },
                    ]
                    : [
                        {
                            combined: false,
                            expression: ts.factory.createLogicalAnd(ts.factory.createLessThanEquals(ts.factory.createNumericLiteral(tuple.elements.filter((t) => t.optional === false).length), arrayLength), ts.factory.createGreaterThanEquals(ts.factory.createNumericLiteral(tuple.elements.length), arrayLength)),
                        },
                    ]
                : []),
            ...(config.joiner.tuple
                ? [
                    {
                        expression: config.joiner.tuple(binaries),
                        combined: true,
                    },
                ]
                : binaries.map((expression) => ({
                    expression,
                    combined: true,
                }))),
            ...(rest !== null
                ? [
                    {
                        expression: rest,
                        combined: true,
                    },
                ]
                : []),
        ], `[${tuple.elements.map((t) => t.getName()).join(", ")}]`);
    };
    const explore_sets = (project) => (config) => (importer) => (input, sets, explore, tags, jsDocTags) => ts.factory.createCallExpression(UnionExplorer.set({
        checker: CheckerProgrammer.decode(project)(config)(importer),
        decoder: decode_array(project)(config)(importer),
        empty: config.success,
        success: config.success,
        failure: (input, expected, explore) => ts.factory.createReturnStatement(config.joiner.failure(input, expected, explore)),
    })([])(input, sets, explore, tags, jsDocTags), undefined, undefined);
    const explore_maps = (project) => (config) => (importer) => (input, maps, explore, tags, jsDocTags) => ts.factory.createCallExpression(UnionExplorer.map({
        checker: (input, entry, explore) => {
            const func = CheckerProgrammer.decode(project)(config)(importer);
            return ts.factory.createLogicalAnd(func(ts.factory.createElementAccessExpression(input, 0), entry[0], Object.assign(Object.assign({}, explore), { postfix: `${explore.postfix}[0]` }), [], []), func(ts.factory.createElementAccessExpression(input, 1), entry[1], Object.assign(Object.assign({}, explore), { postfix: `${explore.postfix}[1]` }), [], []));
        },
        decoder: decode_array(project)(config)(importer),
        empty: config.success,
        success: config.success,
        failure: (input, expected, explore) => ts.factory.createReturnStatement(config.joiner.failure(input, expected, explore)),
    })([])(input, maps, explore, tags, jsDocTags), undefined, undefined);
    const explore_tuples = (project) => (config) => (importer) => (input, tuples, explore, tags, jsDocTags) => explore_array_like_union_types(config)(importer)(UnionExplorer.tuple({
        checker: decode_tuple(project)(config)(importer),
        decoder: decode_tuple(project)(config)(importer),
        empty: config.success,
        success: config.success,
        failure: (input, expected, explore) => ts.factory.createReturnStatement(config.joiner.failure(input, expected, explore)),
    }))(input, tuples, explore, tags, jsDocTags);
    const explore_arrays = (project) => (config) => (importer) => (input, arrays, explore, tags, jsDocTags) => explore_array_like_union_types(config)(importer)(UnionExplorer.array({
        checker: CheckerProgrammer.decode(project)(config)(importer),
        decoder: decode_array(project)(config)(importer),
        empty: config.success,
        success: config.success,
        failure: (input, expected, explore) => ts.factory.createReturnStatement(config.joiner.failure(input, expected, explore)),
    }))(input, arrays, explore, tags, jsDocTags);
    const explore_arrays_and_tuples = (project) => (config) => (importer) => (input, elements, explore, tags, jsDocTags) => explore_array_like_union_types(config)(importer)(UnionExplorer.array_or_tuple({
        checker: (front, target, explore, tags, jsDocTags, array) => target instanceof MetadataTuple
            ? decode_tuple(project)(config)(importer)(front, target, explore, tags, jsDocTags)
            : config.atomist(explore)({
                expression: CheckerProgrammer.decode(project)(config)(importer)(front, target, explore, tags, jsDocTags),
                tags: check_array_length(tags)(array),
            })(array),
        decoder: (input, target, explore, tags, jsDocTags) => target instanceof MetadataTuple
            ? decode_tuple(project)(config)(importer)(input, target, explore, tags, jsDocTags)
            : decode_array(project)(config)(importer)(input, target, explore, tags, jsDocTags),
        empty: config.success,
        success: config.success,
        failure: (input, expected, explore) => ts.factory.createReturnStatement(config.joiner.failure(input, expected, explore)),
    }))(input, elements, explore, tags, jsDocTags);
    const explore_array_like_union_types = (config) => (importer) => (factory) => (input, elements, explore, tags, jsDocTags) => {
        const arrow = (parameters) => (explore) => (input) => factory(parameters)(input, elements, explore, tags, jsDocTags);
        if (elements.every((e) => e.recursive === false))
            ts.factory.createCallExpression(arrow([])(explore)(input), undefined, []);
        explore = Object.assign(Object.assign({}, explore), { source: "function", from: "array" });
        return ts.factory.createLogicalOr(ts.factory.createCallExpression(ts.factory.createIdentifier(importer.emplaceUnion(config.prefix, elements.map((e) => e.name).join(" | "), () => arrow(FeatureProgrammer.parameterDeclarations(config)(TypeFactory.keyword("any"))(ts.factory.createIdentifier("input")))(Object.assign(Object.assign({}, explore), { postfix: "" }))(ts.factory.createIdentifier("input")))), undefined, FeatureProgrammer.argumentsArray(config)(explore)(input)), config.joiner.failure(input, elements.map((e) => e.name).join(" | "), explore));
    };
    const explore_objects = (config) => (importer) => (input, meta, explore) => meta.objects.length === 1
        ? CheckerProgrammer.decode_object(config)(importer)(input, meta.objects[0], explore)
        : ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(`${config.prefix}u${meta.union_index}`)), undefined, FeatureProgrammer.argumentsArray(config)(explore)(input));
})(CheckerProgrammer || (CheckerProgrammer = {}));
const create_add = (binaries) => (defaultInput) => (exact, left, right = defaultInput) => {
    const factory = exact
        ? ts.factory.createStrictEquality
        : ts.factory.createStrictInequality;
    binaries.push({
        expression: factory(left, right),
        combined: false,
    });
};
//# sourceMappingURL=CheckerProgrammer.js.map