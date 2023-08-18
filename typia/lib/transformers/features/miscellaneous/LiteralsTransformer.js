import { LiteralsProgrammer } from "../../../programmers/LiteralsProgrammer";
export var LiteralsTransformer;
(function (LiteralsTransformer) {
    LiteralsTransformer.transform = (project) => (expression) => {
        var _a;
        if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a[0]))
            throw new Error(NOT_SPECIFIED);
        const node = expression.typeArguments[0];
        const type = project.checker.getTypeFromTypeNode(node);
        if (type.isTypeParameter())
            throw new Error(NO_GENERIC_ARGUMENT);
        return LiteralsProgrammer.write(project)(type);
    };
})(LiteralsTransformer || (LiteralsTransformer = {}));
const NOT_SPECIFIED = "Error on typia.literals(): generic argument is not specified.";
const NO_GENERIC_ARGUMENT = "Error on typia.literals(): non-specified generic argument.";
//# sourceMappingURL=LiteralsTransformer.js.map