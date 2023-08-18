import ts from "typescript";
export var GenericTransformer;
(function (GenericTransformer) {
    GenericTransformer.scalar = (method) => (programmer) => (project) => (modulo) => (expression) => {
        if (expression.arguments.length !== 1)
            throw new Error(`Error on typia.${method}(): no input value.`);
        const [type, node, generic] = expression.typeArguments && expression.typeArguments[0]
            ? [
                project.checker.getTypeFromTypeNode(expression.typeArguments[0]),
                expression.typeArguments[0],
                true,
            ]
            : [
                project.checker.getTypeAtLocation(expression.arguments[0]),
                expression.arguments[0],
                false,
            ];
        if (type.isTypeParameter())
            throw new Error(`Error on typia.${method}(): non-specified generic argument.`);
        return ts.factory.createCallExpression(programmer(project)(modulo)(type, generic
            ? node.getFullText().trim()
            : name(project.checker)(type)(node)), undefined, [expression.arguments[0]]);
    };
    GenericTransformer.factory = (method) => (programmer) => (project) => (modulo) => (expression) => {
        var _a;
        if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a[0]))
            throw new Error(`Error on typia.${method}(): generic argument is not specified.`);
        const node = expression.typeArguments[0];
        const type = project.checker.getTypeFromTypeNode(node);
        if (type.isTypeParameter())
            throw new Error(`Error on typia.${method}(): non-specified generic argument.`);
        return programmer(project)(modulo)(type, node.getFullText().trim());
    };
    const name = (checker) => (type) => (node) => checker.typeToString(type, node, ts.TypeFormatFlags.NodeBuilderFlagsMask);
})(GenericTransformer || (GenericTransformer = {}));
//# sourceMappingURL=GenericTransformer.js.map