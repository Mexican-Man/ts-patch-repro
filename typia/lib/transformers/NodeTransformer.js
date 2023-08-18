import ts from "typescript";
import { CallExpressionTransformer } from "./CallExpressionTransformer";
export var NodeTransformer;
(function (NodeTransformer) {
    NodeTransformer.transform = (project) => (expression) => ts.isCallExpression(expression)
        ? CallExpressionTransformer.transform(project)(expression)
        : expression;
})(NodeTransformer || (NodeTransformer = {}));
//# sourceMappingURL=NodeTransformer.js.map