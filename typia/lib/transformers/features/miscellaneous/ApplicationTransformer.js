import ts from "typescript";
import { LiteralFactory } from "../../../factories/LiteralFactory";
import { MetadataCollection } from "../../../factories/MetadataCollection";
import { MetadataFactory } from "../../../factories/MetadataFactory";
import { ApplicationProgrammer } from "../../../programmers/ApplicationProgrammer";
export var ApplicationTransformer;
(function (ApplicationTransformer) {
    ApplicationTransformer.transform = ({ checker }) => (expression) => {
        var _a;
        if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a.length))
            throw new Error(NO_GENERIC_ARGUMENT);
        const top = expression.typeArguments[0];
        if (!ts.isTupleTypeNode(top))
            return expression;
        else if (top.elements.some((child) => !ts.isTypeNode(child)))
            return expression;
        const types = top.elements.map((child) => checker.getTypeFromTypeNode(child));
        if (types.some((t) => t.isTypeParameter()))
            throw new Error(GENERIC_ARGUMENT);
        const purpose = get_parameter(checker, "Purpose", expression.typeArguments[1], (str) => str === "swagger" || str === "ajv", () => "swagger");
        const collection = new MetadataCollection({
            replace: MetadataCollection.replace,
        });
        const metadatas = types.map((type) => MetadataFactory.analyze(checker)({
            resolve: true,
            constant: true,
            absorb: false,
            validate: (meta) => {
                if (meta.atomics.find((str) => str === "bigint"))
                    throw new Error(NO_BIGIT);
                else if (meta.arrays.some((array) => array.value.isRequired() === false))
                    throw new Error(NO_UNDEFINED_IN_ARRAY);
            },
        })(collection)(type));
        const app = ApplicationProgrammer.write({
            purpose,
        })(metadatas);
        return LiteralFactory.generate(app);
    };
    const get_parameter = (checker, name, node, predicator, defaulter) => {
        if (!node)
            return defaulter();
        const type = checker.getTypeFromTypeNode(node);
        if (!type.isLiteral())
            throw new Error(`Error on typia.application(): generic argument "${name}" must be constant.`);
        const value = type.value;
        if (typeof value !== "string" || predicator(value) === false)
            throw new Error(`Error on typia.application(): invalid value on generic argument "${name}".`);
        return value;
    };
})(ApplicationTransformer || (ApplicationTransformer = {}));
const NO_GENERIC_ARGUMENT = "Error on typia.application(): no generic argument.";
const GENERIC_ARGUMENT = "Error on typia.application(): non-specified generic argument(s).";
const NO_BIGIT = "Error on typia.application(): does not allow bigint type.";
const NO_UNDEFINED_IN_ARRAY = "Error on typia.application(): does not allow undefined type in array.";
//# sourceMappingURL=ApplicationTransformer.js.map