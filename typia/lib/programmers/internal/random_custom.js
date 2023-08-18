import ts from "typescript";
import { ExpressionFactory } from "../../factories/ExpressionFactory";
import { LiteralFactory } from "../../factories/LiteralFactory";
export const random_custom = (accessor) => (type) => (comments) => (expression) => ExpressionFactory.coalesce(ts.factory.createCallChain(ts.factory.createPropertyAccessChain(accessor("customs"), ts.factory.createToken(ts.SyntaxKind.QuestionDotToken), ts.factory.createIdentifier(type)), ts.factory.createToken(ts.SyntaxKind.QuestionDotToken), undefined, [LiteralFactory.generate(comments)]))(expression);
//# sourceMappingURL=random_custom.js.map