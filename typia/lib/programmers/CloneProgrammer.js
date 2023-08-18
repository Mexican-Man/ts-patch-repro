import ts from "typescript";
import { ExpressionFactory } from "../factories/ExpressionFactory";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { MetadataCollection } from "../factories/MetadataCollection";
import { MetadataFactory } from "../factories/MetadataFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { Metadata } from "../metadata/Metadata";
import { FeatureProgrammer } from "./FeatureProgrammer";
import { IsProgrammer } from "./IsProgrammer";
import { CloneJoiner } from "./helpers/CloneJoiner";
import { FunctionImporter } from "./helpers/FunctionImporeter";
import { UnionExplorer } from "./helpers/UnionExplorer";
import { decode_union_object } from "./internal/decode_union_object";
import { wrap_metadata_rest_tuple } from "./internal/wrap_metadata_rest_tuple";
export var CloneProgrammer;
(function (CloneProgrammer) {
    CloneProgrammer.write = (project) => (modulo) => {
        const importer = new FunctionImporter();
        return FeatureProgrammer.write(project)(Object.assign(Object.assign({}, configure(project)(importer)), { addition: (collection) => [
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
        if (meta.any ||
            meta.arrays.some((a) => a.value.any) ||
            meta.tuples.some((t) => t.elements.every((e) => e.any)))
            return ts.factory.createCallExpression(importer.use("any"), undefined, [input]);
        const unions = [];
        if (meta.resolved !== null)
            unions.push({
                type: "resolved",
                is: () => IsProgrammer.decode_to_json(true)(input),
                value: () => decode_to_json(project)(config)(importer)(input, meta.resolved.returns, explore),
            });
        for (const tuple of meta.tuples)
            unions.push({
                type: "tuple",
                is: () => IsProgrammer.decode(project)(importer)(input, (() => {
                    const partial = Metadata.initialize();
                    partial.tuples.push(tuple);
                    return partial;
                })(), explore, [], []),
                value: () => decode_tuple(project)(config)(importer)(input, tuple, explore),
            });
        if (meta.arrays.length)
            unions.push({
                type: "array",
                is: () => ExpressionFactory.isArray(input),
                value: () => explore_arrays(project)(config)(importer)(input, meta.arrays, Object.assign(Object.assign({}, explore), { from: "array" })),
            });
        if (meta.sets.length)
            unions.push({
                type: "set",
                is: () => ExpressionFactory.isInstanceOf("Set")(input),
                value: () => ts.factory.createIdentifier("{}"),
            });
        if (meta.maps.length)
            unions.push({
                type: "map",
                is: () => ExpressionFactory.isInstanceOf("Map")(input),
                value: () => ts.factory.createIdentifier("{}"),
            });
        for (const native of meta.natives)
            unions.push({
                type: "native",
                is: () => ExpressionFactory.isInstanceOf(native)(input),
                value: () => native === "Boolean" ||
                    native === "Number" ||
                    native === "String"
                    ? ts.factory.createCallExpression(IdentifierFactory.access(input)("valueOf"), undefined, undefined)
                    : ts.factory.createIdentifier("{}"),
            });
        if (meta.objects.length)
            unions.push({
                type: "object",
                is: () => ExpressionFactory.isObject({
                    checkNull: true,
                    checkArray: false,
                })(input),
                value: () => explore_objects(config)(importer)(input, meta, Object.assign(Object.assign({}, explore), { from: "object" })),
            });
        let last = input;
        for (const u of unions.reverse())
            last = ts.factory.createConditionalExpression(u.is(), undefined, u.value(), undefined, last);
        return ts.factory.createAsExpression(last, TypeFactory.keyword("any"));
    };
    const decode_to_json = (project) => (config) => (importer) => (input, resolved, explore) => {
        return decode(project)(config)(importer)(ts.factory.createCallExpression(IdentifierFactory.access(input)("toJSON"), undefined, []), resolved, explore);
    };
    const decode_object = (importer) => FeatureProgrammer.decode_object({
        trace: false,
        path: false,
        prefix: PREFIX,
    })(importer);
    const decode_array = (config) => (importer) => (input, array, explore) => array.recursive
        ? ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(`${config.prefix}a${array.index}`)), undefined, FeatureProgrammer.argumentsArray(config)(Object.assign(Object.assign({}, explore), { source: "function", from: "array" }))(input))
        : decode_array_inline(config)(importer)(input, array, explore);
    const decode_array_inline = (config) => (importer) => (input, array, explore) => FeatureProgrammer.decode_array(config)(importer)(CloneJoiner.array)(input, array, explore, [], []);
    const decode_tuple = (project) => (config) => (importer) => (input, tuple, explore) => tuple.recursive
        ? ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(`${config.prefix}t${tuple.index}`)), undefined, FeatureProgrammer.argumentsArray(config)(Object.assign(Object.assign({}, explore), { source: "function" }))(input))
        : decode_tuple_inline(project)(config)(importer)(input, tuple, explore);
    const decode_tuple_inline = (project) => (config) => (importer) => (input, tuple, explore) => {
        const children = tuple.elements
            .filter((m) => m.rest === null)
            .map((elem, index) => decode(project)(config)(importer)(ts.factory.createElementAccessExpression(input, index), elem, Object.assign(Object.assign({}, explore), { from: "array", postfix: explore.postfix.length
                ? `${explore.postfix.slice(0, -1)}[${index}]"`
                : `"[${index}]"` })));
        const rest = (() => {
            if (tuple.elements.length === 0)
                return null;
            const last = tuple.elements.at(-1);
            const rest = last.rest;
            if (rest === null)
                return null;
            return decode(project)(config)(importer)(ts.factory.createCallExpression(IdentifierFactory.access(input)("slice"), undefined, [
                ts.factory.createNumericLiteral(tuple.elements.length - 1),
            ]), wrap_metadata_rest_tuple(tuple.elements.at(-1).rest), Object.assign(Object.assign({}, explore), { start: tuple.elements.length - 1 }));
        })();
        return CloneJoiner.tuple(children, rest);
    };
    const explore_objects = (config) => (importer) => (input, meta, explore) => {
        if (meta.objects.length === 1)
            return decode_object(importer)(input, meta.objects[0], explore);
        return ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(`${PREFIX}u${meta.union_index}`)), undefined, FeatureProgrammer.argumentsArray(config)(explore)(input));
    };
    const explore_arrays = (project) => (config) => (importer) => (input, elements, explore) => explore_array_like_union_types(config)(importer)(UnionExplorer.array({
        checker: IsProgrammer.decode(project)(importer),
        decoder: decode_array(config)(importer),
        empty: ts.factory.createIdentifier("[]"),
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
    const PREFIX = "$c";
    const configure = (project) => (importer) => {
        const config = {
            types: {
                input: (type, name) => ts.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)),
                output: (type, name) => ts.factory.createTypeReferenceNode(`typia.Primitive<${name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)}>`),
            },
            prefix: PREFIX,
            trace: false,
            path: false,
            initializer,
            decoder: () => decode(project)(config)(importer),
            objector: {
                checker: () => IsProgrammer.decode(project)(importer),
                decoder: () => decode_object(importer),
                joiner: CloneJoiner.object,
                unionizer: decode_union_object(IsProgrammer.decode_object(importer))(decode_object(importer))((exp) => exp)((input, expected) => create_throw_error(importer)(expected)(input)),
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
        })(collection)(type);
        return [collection, meta];
    };
    const create_throw_error = (importer) => (expected) => (value) => ts.factory.createExpressionStatement(ts.factory.createCallExpression(importer.use("throws"), [], [
        ts.factory.createObjectLiteralExpression([
            ts.factory.createPropertyAssignment("expected", ts.factory.createStringLiteral(expected)),
            ts.factory.createPropertyAssignment("value", value),
        ], true),
    ]));
})(CloneProgrammer || (CloneProgrammer = {}));
//# sourceMappingURL=CloneProgrammer.js.map