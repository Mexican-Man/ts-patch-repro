import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { AssertProgrammer } from "./AssertProgrammer";
export var AssertParseProgrammer;
(function (AssertParseProgrammer) {
    AssertParseProgrammer.write = (project) => (modulo) => (type, name) => ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("input", TypeFactory.keyword("string")),
    ], ts.factory.createTypeReferenceNode(`typia.Primitive<${name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)}>`), undefined, ts.factory.createBlock([
        StatementFactory.constant("assert", AssertProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)(false)(type, name)),
        ts.factory.createExpressionStatement(ts.factory.createBinaryExpression(ts.factory.createIdentifier("input"), ts.SyntaxKind.EqualsToken, ts.factory.createCallExpression(ts.factory.createIdentifier("JSON.parse"), undefined, [ts.factory.createIdentifier("input")]))),
        ts.factory.createReturnStatement(ts.factory.createAsExpression(ts.factory.createCallExpression(ts.factory.createIdentifier("assert"), undefined, [ts.factory.createIdentifier("input")]), ts.factory.createTypeReferenceNode("any"))),
    ]));
})(AssertParseProgrammer || (AssertParseProgrammer = {}));
//# sourceMappingURL=AssertParseProgrammer.js.map