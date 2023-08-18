import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { IsProgrammer } from "./IsProgrammer";
import { PruneProgrammer } from "./PruneProgrammer";
export var IsPruneProgrammer;
(function (IsPruneProgrammer) {
    IsPruneProgrammer.write = (project) => (modulo) => (type, name) => ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("input", TypeFactory.keyword("any")),
    ], ts.factory.createTypePredicateNode(undefined, "input", ts.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type))), undefined, ts.factory.createBlock([
        StatementFactory.constant("is", IsProgrammer.write(project)(modulo)(false)(type, name)),
        StatementFactory.constant("prune", PruneProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)(type, name)),
        ts.factory.createIfStatement(ts.factory.createPrefixUnaryExpression(ts.SyntaxKind.ExclamationToken, ts.factory.createCallExpression(ts.factory.createIdentifier("is"), undefined, [ts.factory.createIdentifier("input")])), ts.factory.createReturnStatement(ts.factory.createFalse())),
        ts.factory.createExpressionStatement(ts.factory.createCallExpression(ts.factory.createIdentifier("prune"), undefined, [ts.factory.createIdentifier("input")])),
        ts.factory.createReturnStatement(ts.factory.createTrue()),
    ]));
})(IsPruneProgrammer || (IsPruneProgrammer = {}));
//# sourceMappingURL=IsPruneProgrammer.js.map