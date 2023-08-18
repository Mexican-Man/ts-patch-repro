import ts from "typescript";
import { Escaper } from "../utils/Escaper";
import { TypeFactory } from "./TypeFactory";
export var IdentifierFactory;
(function (IdentifierFactory) {
    IdentifierFactory.identifier = (name) => Escaper.variable(name)
        ? ts.factory.createIdentifier(name)
        : ts.factory.createStringLiteral(name);
    IdentifierFactory.access = (target) => (property) => {
        const postfix = IdentifierFactory.identifier(property);
        return ts.isStringLiteral(postfix)
            ? ts.factory.createElementAccessExpression(target, postfix)
            : ts.factory.createPropertyAccessExpression(target, postfix);
    };
    IdentifierFactory.postfix = (str) => Escaper.variable(str)
        ? `".${str}"`
        : `"[${JSON.stringify(str).split('"').join('\\"')}]"`;
    IdentifierFactory.parameter = (name, type, init) => {
        if (ts.getDecorators !== undefined)
            return ts.factory.createParameterDeclaration(undefined, undefined, name, (init === null || init === void 0 ? void 0 : init.kind) === ts.SyntaxKind.QuestionToken
                ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
                : undefined, type !== null && type !== void 0 ? type : TypeFactory.keyword("any"), init && init.kind !== ts.SyntaxKind.QuestionToken
                ? init
                : undefined);
        return ts.factory.createParameterDeclaration(undefined, undefined, undefined, name, (init === null || init === void 0 ? void 0 : init.kind) === ts.SyntaxKind.QuestionToken
            ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
            : undefined, type, init && init.kind !== ts.SyntaxKind.QuestionToken
            ? init
            : undefined);
    };
})(IdentifierFactory || (IdentifierFactory = {}));
//# sourceMappingURL=IdentifierFactory.js.map