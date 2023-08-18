import ts from "typescript";
import { ExpressionFactory } from "../factories/ExpressionFactory";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { MetadataCollection } from "../factories/MetadataCollection";
import { MetadataFactory } from "../factories/MetadataFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TemplateFactory } from "../factories/TemplateFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { FunctionImporter } from "./helpers/FunctionImporeter";
import { RandomJoiner } from "./helpers/RandomJoiner";
import { RandomRanger } from "./helpers/RandomRanger";
import { random_custom } from "./internal/random_custom";
export var RandomProgrammer;
(function (RandomProgrammer) {
    RandomProgrammer.write = (project) => (modulo) => (init) => {
        const importer = new FunctionImporter();
        return (type, name) => {
            const collection = new MetadataCollection();
            const meta = MetadataFactory.analyze(project.checker)({
                resolve: true,
                constant: true,
                absorb: true,
            })(collection)(type);
            const functions = {
                objects: write_object_functions(importer)(collection),
                arrays: write_array_functions(importer)(collection),
                tuples: write_tuple_functions(importer)(collection),
            };
            const output = decode(importer)({
                function: false,
                recursive: false,
            })(meta, [], []);
            return ts.factory.createArrowFunction(undefined, undefined, [
                IdentifierFactory.parameter("generator", ts.factory.createTypeReferenceNode("Partial<typia.IRandomGenerator>"), init !== null && init !== void 0 ? init : ts.factory.createToken(ts.SyntaxKind.QuestionToken)),
            ], ts.factory.createTypeReferenceNode(`typia.Primitive<${name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)}>`), undefined, ts.factory.createBlock([
                ...importer.declare(modulo),
                ...functions.objects,
                ...functions.arrays,
                ...functions.tuples,
                ts.factory.createReturnStatement(output),
            ], true));
        };
    };
    const write_object_functions = (importer) => (collection) => collection.objects().map((obj, i) => StatementFactory.constant(PREFIX.object(i), ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("_recursive", TypeFactory.keyword("boolean"), ts.factory.createIdentifier(String(obj.recursive))),
        IdentifierFactory.parameter("_depth", TypeFactory.keyword("number"), ts.factory.createNumericLiteral(0)),
    ], TypeFactory.keyword("any"), undefined, RandomJoiner.object(COALESCE(importer))(decode(importer)({
        recursive: obj.recursive,
        function: true,
    }))(obj))));
    const write_array_functions = (importer) => (collection) => collection
        .arrays()
        .filter((a) => a.recursive)
        .map((array, i) => StatementFactory.constant(PREFIX.array(i), ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("length", TypeFactory.keyword("number")),
        IdentifierFactory.parameter("_recursive", TypeFactory.keyword("boolean"), ts.factory.createTrue()),
        IdentifierFactory.parameter("_depth", TypeFactory.keyword("number"), ts.factory.createNumericLiteral(0)),
    ], TypeFactory.keyword("any"), undefined, RandomJoiner.array(COALESCE(importer))(decode(importer)({
        recursive: true,
        function: true,
    }))({
        recursive: true,
        function: true,
    })(ts.factory.createIdentifier("length"))(array.value, [], []))));
    const write_tuple_functions = (importer) => (collection) => collection
        .tuples()
        .filter((a) => a.recursive)
        .map((tuple, i) => StatementFactory.constant(PREFIX.tuple(i), ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("_recursive", TypeFactory.keyword("boolean"), ts.factory.createTrue()),
        IdentifierFactory.parameter("_depth", TypeFactory.keyword("number"), ts.factory.createNumericLiteral(0)),
    ], TypeFactory.keyword("any"), undefined, RandomJoiner.tuple(decode(importer)({
        function: true,
        recursive: true,
    }))(tuple.elements, [], []))));
    const decode = (importer) => (explore) => (meta, tags, comments) => {
        const expressions = [];
        if (meta.any)
            expressions.push(ts.factory.createStringLiteral("any type used..."));
        if (meta.isRequired() === false)
            expressions.push(ts.factory.createIdentifier("undefined"));
        if (meta.nullable === true)
            expressions.push(ts.factory.createNull());
        for (const constant of meta.constants)
            for (const value of constant.values)
                expressions.push(decode_atomic(value));
        for (const template of meta.templates)
            expressions.push(decode_template(importer)(explore)(template));
        for (const atomic of meta.atomics)
            if (atomic === "boolean")
                expressions.push(decode_boolean(importer));
            else if (atomic === "number")
                expressions.push(decode_number(importer)(tags)(comments));
            else if (atomic === "string")
                expressions.push(decode_string(importer)(tags)(comments));
            else if (atomic === "bigint")
                expressions.push(decode_bigint(importer)(tags)(comments));
        if (meta.resolved)
            expressions.push(decode(importer)(explore)(meta.resolved.returns, tags, comments));
        for (const array of meta.arrays)
            expressions.push(decode_array(importer)(explore)(array, tags, comments));
        for (const tuple of meta.tuples)
            expressions.push(decode_tuple(importer)(explore)(tuple, tags, comments));
        for (const o of meta.objects)
            expressions.push(decode_object(importer)(explore)(o));
        for (const native of meta.natives)
            if (native === "Boolean")
                expressions.push(decode_boolean(importer));
            else if (native === "Number")
                expressions.push(decode_number(importer)(tags)(comments));
            else if (native === "String")
                expressions.push(decode_string(importer)(tags)(comments));
            else
                expressions.push(ts.factory.createIdentifier("{}"));
        if (meta.sets.length || meta.maps.length)
            expressions.push(ts.factory.createIdentifier("{}"));
        if (expressions.length === 1)
            return expressions[0];
        return ts.factory.createCallExpression(ts.factory.createCallExpression(importer.use("pick"), undefined, [
            ts.factory.createArrayLiteralExpression(expressions.map((expr) => ts.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, expr)), true),
        ]), undefined, undefined);
    };
    const decode_boolean = (importer) => ts.factory.createCallExpression(COALESCE(importer)("boolean"), undefined, undefined);
    const decode_atomic = (value) => typeof value === "boolean"
        ? ts.factory.createIdentifier(value.toString())
        : typeof value === "number"
            ? ts.factory.createNumericLiteral(value)
            : typeof value === "string"
                ? ts.factory.createStringLiteral(value)
                : ts.factory.createBigIntLiteral(value.toString());
    const decode_template = (importer) => (explore) => (template) => TemplateFactory.generate(template.map((meta) => decode(importer)(explore)(meta, [], [])));
    const decode_number = (importer) => (tags) => (comments) => {
        const type = tags.find((t) => t.kind === "type" && t.value === "uint")
            ? "int"
            : tags.find((t) => t.kind === "type" && t.value === "int")
                ? "uint"
                : "double";
        return random_custom(COALESCE(importer))("number")(comments)(RandomRanger.number({
            type,
            transform: (value) => ts.factory.createNumericLiteral(value),
            setter: (args) => ts.factory.createCallExpression(type === "double" &&
                tags.every((t) => t.kind !== "multipleOf" &&
                    t.kind !== "step")
                ? COALESCE(importer)("number")
                : COALESCE(importer)("integer"), undefined, args.map((val) => ts.factory.createNumericLiteral(val))),
        })({
            minimum: 0,
            maximum: 100,
            gap: 10,
        })(tags));
    };
    const decode_bigint = (importer) => (tags) => (comments) => random_custom(COALESCE(importer))("bigint")(comments)(RandomRanger.number({
        type: tags.find((t) => t.kind === "type" && t.value === "uint")
            ? "uint"
            : "int",
        transform: (value) => ts.factory.createCallExpression(ts.factory.createIdentifier("BigInt"), undefined, [ts.factory.createStringLiteral(value.toString())]),
        setter: (args) => ts.factory.createCallExpression(COALESCE(importer)("bigint"), undefined, args.map((value) => ts.factory.createCallExpression(ts.factory.createIdentifier("BigInt"), undefined, [
            ts.factory.createStringLiteral(value.toString()),
        ]))),
    })({
        minimum: 0,
        maximum: 100,
        gap: 10,
    })(tags));
    const decode_string = (importer) => (tags) => (comments) => random_custom(COALESCE(importer))("string")(comments)((() => {
        for (const t of tags)
            if (t.kind === "format")
                return ts.factory.createCallExpression(COALESCE(importer)(t.value), undefined, undefined);
            else if (t.kind === "pattern")
                return ts.factory.createCallExpression(COALESCE(importer)("pattern"), undefined, [ts.factory.createIdentifier(`/${t.value}/`)]);
        const tail = RandomRanger.length(COALESCE(importer))({
            minimum: 5,
            maximum: 25,
            gap: 5,
        })({
            fixed: "length",
            minimum: "minLength",
            maximum: "maxLength",
        })(tags);
        return ts.factory.createCallExpression(COALESCE(importer)("string"), undefined, tail ? [tail] : undefined);
    })());
    const decode_array = (importer) => (explore) => (array, tags, comments) => {
        const length = RandomRanger.length(COALESCE(importer))({
            minimum: 0,
            maximum: 3,
            gap: 3,
        })({
            fixed: "items",
            minimum: "minItems",
            maximum: "maxItems",
        })(tags);
        if (array.recursive)
            return ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(PREFIX.array(array.index))), undefined, [
                length !== null && length !== void 0 ? length : COALESCE(importer)("length"),
                ts.factory.createTrue(),
                explore.recursive
                    ? ts.factory.createAdd(ts.factory.createNumericLiteral(1), ts.factory.createIdentifier("_depth"))
                    : ts.factory.createNumericLiteral(0),
            ]);
        const expr = RandomJoiner.array(COALESCE(importer))(decode(importer)(explore))(explore)(length)(array.value, tags, comments);
        return explore.recursive
            ? ts.factory.createConditionalExpression(ts.factory.createLogicalAnd(ts.factory.createIdentifier("_recursive"), ts.factory.createLessThan(ts.factory.createNumericLiteral(5), ts.factory.createIdentifier("_depth"))), undefined, ts.factory.createIdentifier("[]"), undefined, expr)
            : expr;
    };
    const decode_tuple = (importer) => (explore) => (tuple, tags, comments) => tuple.recursive
        ? ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(PREFIX.tuple(tuple.index))), undefined, [
            ts.factory.createTrue(),
            explore.recursive
                ? ts.factory.createAdd(ts.factory.createNumericLiteral(1), ts.factory.createIdentifier("_depth"))
                : ts.factory.createNumericLiteral(0),
        ])
        : RandomJoiner.tuple(decode(importer)(explore))(tuple.elements, tags, comments);
    const decode_object = (importer) => (explore) => (object) => ts.factory.createCallExpression(ts.factory.createIdentifier(importer.useLocal(PREFIX.object(object.index))), undefined, explore.function
        ? [
            explore.recursive
                ? ts.factory.createTrue()
                : ts.factory.createIdentifier("_recursive"),
            ts.factory.createConditionalExpression(ts.factory.createIdentifier("_recursive"), undefined, ts.factory.createAdd(ts.factory.createNumericLiteral(1), ts.factory.createIdentifier("_depth")), undefined, ts.factory.createIdentifier("_depth")),
        ]
        : undefined);
})(RandomProgrammer || (RandomProgrammer = {}));
const PREFIX = {
    object: (i) => `$ro${i}`,
    array: (i) => `$ra${i}`,
    tuple: (i) => `$rt${i}`,
};
const COALESCE = (importer) => (name) => ExpressionFactory.coalesce(ts.factory.createPropertyAccessChain(ts.factory.createIdentifier("generator"), ts.factory.createToken(ts.SyntaxKind.QuestionDotToken), ts.factory.createIdentifier(name)))(IdentifierFactory.access(importer.use("generator"))(name));
//# sourceMappingURL=RandomProgrammer.js.map