import ts from "typescript";
import { RandomProgrammer } from "../../../programmers/RandomProgrammer";
export var RandomTransformer;
(function (RandomTransformer) {
    RandomTransformer.transform = (project) => (modulo) => (expression) => {
        var _a;
        if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a[0]))
            throw new Error(NOT_SPECIFIED);
        const node = expression.typeArguments[0];
        const type = project.checker.getTypeFromTypeNode(node);
        if (type.isTypeParameter())
            throw new Error(NO_GENERIC_ARGUMENT);
        return ts.factory.createCallExpression(RandomProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)()(type, node.getFullText().trim()), undefined, expression.arguments.length
            ? [expression.arguments[0]]
            : undefined);
    };
})(RandomTransformer || (RandomTransformer = {}));
const NOT_SPECIFIED = "Error on typia.random(): generic argument is not specified.";
const NO_GENERIC_ARGUMENT = "Error on typia.random(): non-specified generic argument.";
//# sourceMappingURL=RandomTransformer.js.map