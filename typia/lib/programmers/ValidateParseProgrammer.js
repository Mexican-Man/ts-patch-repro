import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { ValidateProgrammer } from "./ValidateProgrammer";
export var ValidateParseProgrammer;
(function (ValidateParseProgrammer) {
    ValidateParseProgrammer.write = (project) => (modulo) => (type, name) => ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("input", TypeFactory.keyword("string")),
    ], ts.factory.createTypeReferenceNode(`typia.IValidation<typia.Primitive<${name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)}>>`), undefined, ts.factory.createBlock([
        StatementFactory.constant("validate", ValidateProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)(false)(type, name)),
        ts.factory.createExpressionStatement(ts.factory.createBinaryExpression(ts.factory.createIdentifier("input"), ts.SyntaxKind.EqualsToken, ts.factory.createCallExpression(ts.factory.createIdentifier("JSON.parse"), undefined, [ts.factory.createIdentifier("input")]))),
        StatementFactory.constant("output", ts.factory.createCallExpression(ts.factory.createIdentifier("validate"), undefined, [ts.factory.createIdentifier("input")])),
        ts.factory.createReturnStatement(ts.factory.createAsExpression(ts.factory.createIdentifier("output"), ts.factory.createTypeReferenceNode("any"))),
    ]));
})(ValidateParseProgrammer || (ValidateParseProgrammer = {}));
//# sourceMappingURL=ValidateParseProgrammer.js.map