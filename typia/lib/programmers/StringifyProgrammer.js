import ts from "typescript";
import { ExpressionFactory } from "../factories/ExpressionFactory";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { MetadataCollection } from "../factories/MetadataCollection";
import { MetadataFactory } from "../factories/MetadataFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { ValueFactory } from "../factories/ValueFactory";
import { Metadata } from "../metadata/Metadata";
import { ArrayUtil } from "../utils/ArrayUtil";
import { FeatureProgrammer } from "./FeatureProgrammer";
import { IsProgrammer } from "./IsProgrammer";
import { AtomicPredicator } from "./helpers/AtomicPredicator";
import { FunctionImporter } from "./helpers/FunctionImporeter";
import { OptionPredicator } from "./helpers/OptionPredicator";
import { StringifyJoiner } from "./helpers/StringifyJoinder";
import { StringifyPredicator } from "./helpers/StringifyPredicator";
import { UnionExplorer } from "./helpers/UnionExplorer";
import { check_native } from "./internal/check_native";
import { decode_union_object } from "./internal/decode_union_object";
import { feature_object_entries } from "./internal/feature_object_entries";
import { wrap_metadata_rest_tuple } from "./internal/wrap_metadata_rest_tuple";
export var StringifyProgrammer;
(function (StringifyProgrammer) {
    StringifyProgrammer.write = (project) => (modulo) => {
        const importer = new FunctionImporter();
        const config = configure(project)(importer);
        return FeatureProgrammer.write(project)(Object.assign(Object.assign({}, config), { addition: (collection) => [
                ...IsProgrammer.write_function_statements(project)(importer)(collection),
                ...importer.declare(modulo),
            ] }))(importer);
    };
    const write_array_functions = (config) => (importer) => (collection) => collection
        .arrays()
        .filter((a) => a.recursive)
        .map((array, i) => StatementFactory.constant(`${config.prefix}a${i}`, ts.factory.createArrowFunction(undefined, undefined, FeatureProgrammer.parameterDeclarations(config)(TypeFactory.keyword("any"))(ts.factory.createIdentifier("input")), TypeFactory.keyword("any"), undefined, decode_array_inline(config)(importer)(ts.factory.createIdentifier("input"), array, {
        tracable: config.trace,
        source: "function",
        from: "array",
        postfix: "",
    }))));
    const write_tuple_functions = (project) => (config) => (importer) => (collection) => collection
        .tuples()
        .filter((t) => t.recursive)
        .map((tuple, i) => StatementFactory.constant(`${config.prefix}t${i}`, ts.factory.createArrowFunction(undefined, undefined, FeatureProgrammer.parameterDeclarations(config)(TypeFactory.keyword("any"))(ts.factory.createIdentifier("input")), TypeFactory.keyword("any"), undefined, decode_tuple_inline(project)(config)(importer)(ts.factory.createIdentifier("input"), tuple, {
        tracable: config.trace,
        source: "function",
        from: "array",
        postfix: "",
    }))));
    const decode = (project) => (config) => (importer) => (input, meta, explore) => {
        if (meta.any === true)
            return wrap_required(input, meta, explore)(wrap_functional(input, meta, explore)(ts.factory.createCallExpression(ts.factory.createIdentifier("JSON.stringify"), undefined, [input])));
        const size = meta.size();
        if (size === 0 &&
            (meta.isRequired() === false || meta.nullable === true)) {
            if (meta.isRequired() === false && meta.nullable === true)
                return explore.from === "array"
                    ? ts.factory.createStringLiteral("null")
                    : ts.factory.createConditionalExpression(ts.factory.createStrictEquality(ts.factory.createNull(), input), undefined, ts.factory.createStringLiteral("null"), undefined, ts.factory.createIdentifier("undefined"));
            else if (meta.isRequired() === false)
                return explore.from === "array"
                    ? ts.factory.createStringLiteral("null")
                    : ts.factory.createIdentifier("undefined");
            else
                return ts.factory.createStringLiteral("null");
        }
        const unions = [];
        if (meta.resolved !== null)
            unions.push({
                type: "resolved",
                is: () => IsProgrammer.decode_to_json(false)(input),
                value: () => decode_to_json(project)(config)(importer)(input, meta.resolved.returns, explore),
            });
        else if (meta.functional === true)
            unions.push({
                type: "functional",
                is: () => IsProgrammer.decode_functional(input),
                value: () => decode_functional(explore),
            });
        if (meta.templates.length ||
            ArrayUtil.has(meta.constants, (c) => c.type === "string"))
            if (AtomicPredicator.template(meta)) {
                const partial = Metadata.initialize();
                partial.atomics.push("string"),
                    unions.push({
                        type: "template literal",
                        is: () => IsProgrammer.decode(project)(importer)(input, partial, explore, [], []),
                        value: () => decode_atomic(project)(importer)(input, "string", explore),
                    });
            }
        for (const constant of meta.constants)
            if (AtomicPredicator.constant(meta)(constant.type) === false)
                continue;
            else if (constant.type !== "string")
                unions.push({
                    type: "atomic",
                    is: () => IsProgrammer.decode(project)(importer)(input, (() => {
                        const partial = Metadata.initialize();
                        partial.atomics.push(constant.type);
                        return partial;
                    })(), explore, [], []),
                    value: () => decode_atomic(project)(importer)(input, constant.type, explore),
                });
            else if (meta.templates.length === 0)
                unions.push({
                    type: "const string",
                    is: () => IsProgrammer.decode(project)(importer)(input, (() => {
                        const partial = Metadata.initialize();
                        partial.atomics.push("string");
                        return partial;
                    })(), explore, [], []),
                    value: () => decode_constant_string(project)(importer)(input, [...constant.values], explore),
                });
        for (const type of meta.atomics)
            if (AtomicPredicator.atomic(meta)(type))
                unions.push({
                    type: "atomic",
                    is: () => IsProgrammer.decode(project)(importer)(input, (() => {
                        const partial = Metadata.initialize();
                        partial.atomics.push(type);
                        return partial;
                    })(), explore, [], []),
                    value: () => decode_atomic(project)(importer)(input, type, explore),
                });
        for (const tuple of meta.tuples) {
            for (const child of tuple.elements)
                if (StringifyPredicator.undefindable(meta))
                    throw new Error(`Error on typia.stringify(): tuple cannot contain undefined value - (${child.getName()}).`);
            unions.push({
                type: "tuple",
                is: () => IsProgrammer.decode(project)(importer)(input, (() => {
                    const partial = Metadata.initialize();
                    partial.tuples.push(tuple);
                    return partial;
                })(), explore, [], []),
                value: () => decode_tuple(project)(config)(importer)(input, tuple, explore),
            });
        }
        if (meta.arrays.length) {
            for (const child of meta.arrays)
                if (StringifyPredicator.undefindable(child.value))
                    throw new Error(`Error on typia.stringify(): array cannot contain undefined value (${child.value.getName()}).`);
            const value = meta.arrays.length === 1
                ? () => decode_array(config)(importer)(input, meta.arrays[0], Object.assign(Object.assign({}, explore), { from: "array" }))
                : meta.arrays.some((elem) => elem.value.any)
                    ? () => ts.factory.createCallExpression(ts.factory.createIdentifier("JSON.stringify"), undefined, [input])
                    : () => explore_arrays(project)(config)(importer)(input, meta.arrays, Object.assign(Object.assign({}, explore), { from: "array" }));
            unions.push({
                type: "array",
                is: () => ExpressionFactory.isArray(input),
                value,
            });
        }
        if (meta.natives.length)
            for (const native of meta.natives)
                unions.push({
                    type: "object",
                    is: () => check_native(native)(input),
                    value: () => AtomicPredicator.native(native)
                        ? decode_atomic(project)(importer)(input, native.toLowerCase(), explore)
                        : ts.factory.createStringLiteral("{}"),
                });
        if (meta.sets.length)
            unions.push({
                type: "object",
                is: () => ExpressionFactory.isInstanceOf("Set")(input),
                value: () => ts.factory.createStringLiteral("{}"),
            });
        if (meta.maps.length)
            unions.push({
                type: "object",
                is: () => ExpressionFactory.isInstanceOf("Map")(input),
                value: () => ts.factory.createStringLiteral("{}"),
            });
        if (meta.objects.length)
            unions.push({
                type: "object",
                is: () => ExpressionFactory.isObject({
                    checkNull: true,
                    checkArray: meta.objects.some((obj) => obj.properties.every((prop) => !prop.key.isSoleLiteral() ||
                        !prop.value.isRequired())),
                })(input),
                value: () => meta.isParentResolved() === false &&
                    meta.objects.length === 1 &&
                    meta.objects[0]._Is_simple(explore.from === "top" ? 0 : 1)
                    ? (() => {
                        const obj = meta.objects[0];
                        const entries = feature_object_entries({
                            decoder: () => decode(project)(config)(importer),
                            trace: false,
                            path: false,
                        })(importer)(obj)(ts.factory.createAsExpression(input, TypeFactory.keyword("any")));
                        return StringifyJoiner.object(importer)(ts.factory.createAsExpression(input, TypeFactory.keyword("any")), entries);
                    })()
                    : explore_objects(config)(importer)(input, meta, Object.assign(Object.assign({}, explore), { from: "object" })),
            });
        const wrapper = (output) => wrap_required(input, meta, explore)(wrap_nullable(input, meta)(output));
        if (unions.length === 0)
            return ts.factory.createCallExpression(ts.factory.createIdentifier("JSON.stringify"), undefined, [input]);
        else if (unions.length === 1)
            return wrapper(unions[0].value());
        return wrapper(ts.factory.createCallExpression(ts.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, iterate(importer, input, unions, meta.getName())), undefined, undefined));
    };
    const decode_object = (importer) => FeatureProgrammer.decode_object({
        trace: false,
        path: false,
        prefix: PREFIX,
    })(importer);
    const decode_array = (config) => (importer) => (input, array, explore) => array.recursive
        ? ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(`${config.prefix}a${array.index}`)), undefined, FeatureProgrammer.argumentsArray(config)(Object.assign(Object.assign({}, explore), { source: "function", from: "array" }))(input))
        : decode_array_inline(config)(importer)(input, array, explore);
    const decode_array_inline = (config) => (importer) => (input, array, explore) => FeatureProgrammer.decode_array(config)(importer)(StringifyJoiner.array)(input, array, explore, [], []);
    const decode_tuple = (project) => (config) => (importer) => (input, tuple, explore) => tuple.recursive
        ? ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(`${config.prefix}t${tuple.index}`)), undefined, FeatureProgrammer.argumentsArray(config)(Object.assign(Object.assign({}, explore), { source: "function" }))(input))
        : decode_tuple_inline(project)(config)(importer)(input, tuple, explore);
    const decode_tuple_inline = (project) => (config) => (importer) => (input, tuple, explore) => {
        const children = tuple.elements
            .filter((elem) => elem.rest === null)
            .map((elem, index) => decode(project)(config)(importer)(ts.factory.createElementAccessExpression(input, index), elem, Object.assign(Object.assign({}, explore), { from: "array", postfix: explore.postfix.length
                ? `${explore.postfix.slice(0, -1)}[${index}]"`
                : `"[${index}]"` })));
        const rest = (() => {
            if (tuple.elements.length === 0)
                return null;
            const last = tuple.elements.at(-1);
            if (last.rest === null)
                return null;
            const code = decode(project)(config)(importer)(ts.factory.createCallExpression(IdentifierFactory.access(input)("slice"), undefined, [
                ts.factory.createNumericLiteral(tuple.elements.length - 1),
            ]), wrap_metadata_rest_tuple(tuple.elements.at(-1).rest), Object.assign(Object.assign({}, explore), { start: tuple.elements.length - 1 }));
            return ts.factory.createCallExpression(importer.use("rest"), undefined, [code]);
        })();
        return StringifyJoiner.tuple(children, rest);
    };
    const decode_atomic = (project) => (importer) => (input, type, explore) => {
        if (type === "string")
            return ts.factory.createCallExpression(importer.use("string"), undefined, [input]);
        else if (type === "number" &&
            OptionPredicator.numeric(project.options))
            input = ts.factory.createCallExpression(importer.use("number"), undefined, [input]);
        return explore.from !== "top"
            ? input
            : ts.factory.createCallExpression(IdentifierFactory.access(input)("toString"), undefined, undefined);
    };
    const decode_constant_string = (project) => (importer) => (input, values, explore) => {
        if (values.every((v) => !StringifyPredicator.require_escape(v)))
            return [
                ts.factory.createStringLiteral('"'),
                input,
                ts.factory.createStringLiteral('"'),
            ].reduce((x, y) => ts.factory.createAdd(x, y));
        else
            return decode_atomic(project)(importer)(input, "string", explore);
    };
    const decode_to_json = (project) => (config) => (importer) => (input, resolved, explore) => {
        return decode(project)(config)(importer)(ts.factory.createCallExpression(IdentifierFactory.access(input)("toJSON"), undefined, []), resolved, explore);
    };
    const decode_functional = (explore) => explore.from === "array"
        ? ts.factory.createStringLiteral("null")
        : ts.factory.createIdentifier("undefined");
    const explore_objects = (config) => (importer) => (input, meta, explore) => meta.objects.length === 1
        ? decode_object(importer)(input, meta.objects[0], explore)
        : ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(`${PREFIX}u${meta.union_index}`)), undefined, FeatureProgrammer.argumentsArray(config)(explore)(input));
    const explore_arrays = (project) => (config) => (importer) => (input, elements, explore) => explore_array_like_union_types(config)(importer)(UnionExplorer.array({
        checker: IsProgrammer.decode(project)(importer),
        decoder: decode_array(config)(importer),
        empty: ts.factory.createStringLiteral("[]"),
        success: ts.factory.createTrue(),
        failure: (input, expected) => create_throw_error(importer)(expected)(input),
    }))(input, elements, explore);
    const explore_array_like_union_types = (config) => (importer) => (factory) => (input, elements, explore) => {
        const arrow = (parameters) => (explore) => (input) => factory(parameters)(input, elements, explore, [], []);
        if (elements.every((e) => e.recursive === false))
            ts.factory.createCallExpression(arrow([])(explore)(input), undefined, []);
        explore = Object.assign(Object.assign({}, explore), { source: "function", from: "array" });
        return ts.factory.createCallExpression(ts.factory.createIdentifier(importer.emplaceUnion(config.prefix, elements.map((e) => e.name).join(" | "), () => arrow(FeatureProgrammer.parameterDeclarations(config)(TypeFactory.keyword("any"))(ts.factory.createIdentifier("input")))(Object.assign(Object.assign({}, explore), { postfix: "" }))(ts.factory.createIdentifier("input")))), undefined, FeatureProgrammer.argumentsArray(config)(explore)(input));
    };
    const wrap_required = (input, meta, explore) => {
        if (meta.isRequired() === true && meta.any === false)
            return (expression) => expression;
        return (expression) => ts.factory.createConditionalExpression(ts.factory.createStrictInequality(ts.factory.createIdentifier("undefined"), input), undefined, expression, undefined, explore.from === "array"
            ? ts.factory.createStringLiteral("null")
            : ts.factory.createIdentifier("undefined"));
    };
    const wrap_nullable = (input, meta) => {
        if (meta.nullable === false)
            return (expression) => expression;
        return (expression) => ts.factory.createConditionalExpression(ts.factory.createStrictInequality(ts.factory.createNull(), input), undefined, expression, undefined, ts.factory.createStringLiteral("null"));
    };
    const wrap_functional = (input, meta, explore) => {
        if (meta.functional === false)
            return (expression) => expression;
        return (expression) => ts.factory.createConditionalExpression(ts.factory.createStrictInequality(ts.factory.createStringLiteral("function"), ValueFactory.TYPEOF(input)), undefined, expression, undefined, decode_functional(explore));
    };
    const iterate = (importer, input, unions, expected) => ts.factory.createBlock([
        ...unions.map((u) => ts.factory.createIfStatement(u.is(), ts.factory.createReturnStatement(u.value()))),
        create_throw_error(importer)(expected)(input),
    ], true);
    const PREFIX = "$s";
    const configure = (project) => (importer) => {
        const config = {
            types: {
                input: (type, name) => ts.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)),
                output: () => TypeFactory.keyword("string"),
            },
            prefix: PREFIX,
            trace: false,
            path: false,
            initializer,
            decoder: () => decode(project)(config)(importer),
            objector: {
                checker: () => (input, meta, explore) => IsProgrammer.decode(project)(importer)(input, meta, explore, [], []),
                decoder: () => decode_object(importer),
                joiner: StringifyJoiner.object(importer),
                unionizer: decode_union_object(IsProgrammer.decode_object(importer))(decode_object(importer))((exp) => exp)((value, expected) => create_throw_error(importer)(expected)(value)),
                failure: (input, expected) => create_throw_error(importer)(expected)(input),
            },
            generator: {
                arrays: () => write_array_functions(config)(importer),
                tuples: () => write_tuple_functions(project)(config)(importer),
            },
        };
        return config;
    };
    const initializer = ({ checker }) => (type) => {
        const collection = new MetadataCollection();
        const meta = MetadataFactory.analyze(checker)({
            resolve: true,
            constant: true,
            absorb: true,
            validate: (meta) => {
                if (meta.atomics.find((str) => str === "bigint"))
                    throw new Error(NO_BIGINT);
                else if (meta.arrays.some((array) => array.value.isRequired() === false))
                    throw new Error(NO_UNDEFINED_IN_ARRAY);
            },
        })(collection)(type);
        return [collection, meta];
    };
    const create_throw_error = (importer) => (expected) => (value) => ts.factory.createExpressionStatement(ts.factory.createCallExpression(importer.use("throws"), [], [
        ts.factory.createObjectLiteralExpression([
            ts.factory.createPropertyAssignment("expected", ts.factory.createStringLiteral(expected)),
            ts.factory.createPropertyAssignment("value", value),
        ], true),
    ]));
})(StringifyProgrammer || (StringifyProgrammer = {}));
const NO_BIGINT = "Error on typia.stringify(): does not allow bigint type.";
const NO_UNDEFINED_IN_ARRAY = "Error on typia.stringify(): does not allow undefined type in array.";
//# sourceMappingURL=StringifyProgrammer.js.map