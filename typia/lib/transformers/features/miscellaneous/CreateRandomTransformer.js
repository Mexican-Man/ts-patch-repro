import { RandomProgrammer } from "../../../programmers/RandomProgrammer";
export var CreateRandomTransformer;
(function (CreateRandomTransformer) {
    CreateRandomTransformer.transform = (project) => (modulo) => (expression) => {
        var _a, _b;
        if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a[0]))
            throw new Error(NOT_SPECIFIED);
        const node = expression.typeArguments[0];
        const type = project.checker.getTypeFromTypeNode(node);
        if (type.isTypeParameter())
            throw new Error(NO_GENERIC_ARGUMENT);
        return RandomProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)((_b = expression.arguments) === null || _b === void 0 ? void 0 : _b[0])(type, node.getFullText().trim());
    };
})(CreateRandomTransformer || (CreateRandomTransformer = {}));
const NOT_SPECIFIED = "Error on typia.createRandom(): generic argument is not specified.";
const NO_GENERIC_ARGUMENT = "Error on typia.createRandom(): non-specified generic argument.";
//# sourceMappingURL=CreateRandomTransformer.js.map