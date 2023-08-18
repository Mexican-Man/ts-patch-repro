import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { IsProgrammer } from "./IsProgrammer";
export var IsParseProgrammer;
(function (IsParseProgrammer) {
    IsParseProgrammer.write = (project) => (modulo) => (type, name) => ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("input", TypeFactory.keyword("any")),
    ], ts.factory.createTypeReferenceNode(`typia.Primitive<${name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)}>`), undefined, ts.factory.createBlock([
        StatementFactory.constant("is", IsProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)(false)(type, name)),
        ts.factory.createExpressionStatement(ts.factory.createBinaryExpression(ts.factory.createIdentifier("input"), ts.SyntaxKind.EqualsToken, ts.factory.createCallExpression(ts.factory.createIdentifier("JSON.parse"), undefined, [ts.factory.createIdentifier("input")]))),
        ts.factory.createReturnStatement(ts.factory.createConditionalExpression(ts.factory.createCallExpression(ts.factory.createIdentifier("is"), undefined, [ts.factory.createIdentifier("input")]), undefined, ts.factory.createAsExpression(ts.factory.createIdentifier("input"), TypeFactory.keyword("any")), undefined, ts.factory.createNull())),
    ]));
})(IsParseProgrammer || (IsParseProgrammer = {}));
//# sourceMappingURL=IsParseProgrammer.js.map