import ts from "typescript";
import { ExpressionFactory } from "../factories/ExpressionFactory";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { ValueFactory } from "../factories/ValueFactory";
import { CheckerProgrammer } from "./CheckerProgrammer";
import { FunctionImporter } from "./helpers/FunctionImporeter";
import { OptionPredicator } from "./helpers/OptionPredicator";
import { disable_function_importer_declare } from "./helpers/disable_function_importer_declare";
import { check_object } from "./internal/check_object";
import { feature_object_entries } from "./internal/feature_object_entries";
export var IsProgrammer;
(function (IsProgrammer) {
    IsProgrammer.configure = (options) => (importer) => ({
        prefix: "$i",
        trace: false,
        path: false,
        equals: !!(options === null || options === void 0 ? void 0 : options.object),
        numeric: OptionPredicator.numeric({
            numeric: options === null || options === void 0 ? void 0 : options.numeric,
        }),
        atomist: () => (entry) => () => [
            entry.expression,
            ...entry.tags.map((tag) => tag.expression),
        ].reduce((x, y) => ts.factory.createLogicalAnd(x, y)),
        combiner: () => (type) => {
            const initial = type === "and"
                ? ts.factory.createTrue()
                : ts.factory.createFalse();
            const binder = type === "and"
                ? ts.factory.createLogicalAnd
                : ts.factory.createLogicalOr;
            return (_input, binaries) => binaries.length
                ? binaries
                    .map((binary) => binary.expression)
                    .reduce((x, y) => binder(x, y))
                : initial;
        },
        joiner: {
            object: (options === null || options === void 0 ? void 0 : options.object) ||
                check_object({
                    equals: !!(options === null || options === void 0 ? void 0 : options.object),
                    undefined: OptionPredicator.undefined({
                        undefined: options === null || options === void 0 ? void 0 : options.undefined,
                    }),
                    assert: true,
                    reduce: ts.factory.createLogicalAnd,
                    positive: ts.factory.createTrue(),
                    superfluous: () => ts.factory.createFalse(),
                })(importer),
            array: (input, arrow) => ts.factory.createCallExpression(IdentifierFactory.access(input)("every"), undefined, [arrow]),
            failure: () => ts.factory.createFalse(),
        },
        success: ts.factory.createTrue(),
    });
    IsProgrammer.write = (project) => (modulo, disable) => (equals) => {
        const importer = disable === {}
            ? disable_function_importer_declare(new FunctionImporter())
            : new FunctionImporter();
        const config = Object.assign(Object.assign({}, IsProgrammer.configure({
            object: check_object({
                equals,
                undefined: OptionPredicator.undefined(project.options),
                assert: true,
                reduce: ts.factory.createLogicalAnd,
                positive: ts.factory.createTrue(),
                superfluous: () => ts.factory.createFalse(),
            })(importer),
            numeric: OptionPredicator.numeric(project.options),
        })(importer)), { trace: equals, addition: () => importer.declare(modulo) });
        config.decoder =
            () => (input, target, explore, tags, jsDocTags) => {
                if (target.size() === 1 &&
                    target.objects.length === 1 &&
                    target.isRequired() === true &&
                    target.nullable === false) {
                    const obj = target.objects[0];
                    if (obj._Is_simple(explore.from === "top" ? 0 : 1) &&
                        (equals === false ||
                            OptionPredicator.undefined(project.options) ===
                                false))
                        return ts.factory.createLogicalAnd(ExpressionFactory.isObject({
                            checkNull: true,
                            checkArray: false,
                        })(input), config.joiner.object(ts.factory.createAsExpression(input, TypeFactory.keyword("any")), feature_object_entries(config)(importer)(obj)(ts.factory.createAsExpression(input, TypeFactory.keyword("any")), "top")));
                }
                return CheckerProgrammer.decode(project)(config)(importer)(input, target, explore, tags, jsDocTags);
            };
        return CheckerProgrammer.write(project)(config)(importer);
    };
    IsProgrammer.write_function_statements = (project) => (importer) => (collection) => {
        const config = IsProgrammer.configure()(importer);
        const objects = CheckerProgrammer.write_object_functions(project)(config)(importer)(collection);
        const unions = CheckerProgrammer.write_union_functions(project)(config)(importer)(collection);
        const arrays = CheckerProgrammer.write_array_functions(project)(config)(importer)(collection);
        const tuples = CheckerProgrammer.write_tuple_functions(project)(config)(importer)(collection);
        return [
            ...objects.filter((_, i) => importer.hasLocal(`${config.prefix}o${i}`)),
            ...unions.filter((_, i) => importer.hasLocal(`${config.prefix}u${i}`)),
            ...arrays.filter((_, i) => importer.hasLocal(`${config.prefix}a${i}`)),
            ...tuples.filter((_, i) => importer.hasLocal(`${config.prefix}t${i}`)),
        ];
    };
    IsProgrammer.decode = (project) => (importer) => CheckerProgrammer.decode(project)(IsProgrammer.configure()(importer))(importer);
    IsProgrammer.decode_object = (importer) => CheckerProgrammer.decode_object(IsProgrammer.configure()(importer))(importer);
    IsProgrammer.decode_to_json = (checkNull) => (input) => ts.factory.createLogicalAnd(ExpressionFactory.isObject({
        checkArray: false,
        checkNull,
    })(input), ts.factory.createStrictEquality(ts.factory.createStringLiteral("function"), ValueFactory.TYPEOF(IdentifierFactory.access(input)("toJSON"))));
    IsProgrammer.decode_functional = (input) => ts.factory.createStrictEquality(ts.factory.createStringLiteral("function"), ValueFactory.TYPEOF(input));
})(IsProgrammer || (IsProgrammer = {}));
//# sourceMappingURL=IsProgrammer.js.map