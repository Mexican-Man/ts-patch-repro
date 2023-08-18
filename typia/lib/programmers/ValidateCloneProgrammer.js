import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { CloneProgrammer } from "./CloneProgrammer";
import { ValidateProgrammer } from "./ValidateProgrammer";
export var ValidateCloneProgrammer;
(function (ValidateCloneProgrammer) {
    ValidateCloneProgrammer.write = (project) => (modulo) => (type, name) => ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("input", TypeFactory.keyword("any")),
    ], ts.factory.createTypeReferenceNode(`typia.IValidation<typia.Primitive<${name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)}>>`), undefined, ts.factory.createBlock([
        StatementFactory.constant("validate", ValidateProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: true }) }))(modulo)(false)(type, name)),
        StatementFactory.constant("clone", CloneProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)(type, name)),
        StatementFactory.constant("output", ts.factory.createAsExpression(ts.factory.createCallExpression(ts.factory.createIdentifier("validate"), undefined, [ts.factory.createIdentifier("input")]), TypeFactory.keyword("any"))),
        ts.factory.createIfStatement(ts.factory.createIdentifier("output.success"), ts.factory.createExpressionStatement(ts.factory.createBinaryExpression(ts.factory.createIdentifier("output.data"), ts.SyntaxKind.EqualsToken, ts.factory.createCallExpression(ts.factory.createIdentifier("clone"), undefined, [ts.factory.createIdentifier("input")])))),
        ts.factory.createReturnStatement(ts.factory.createIdentifier("output")),
    ]));
})(ValidateCloneProgrammer || (ValidateCloneProgrammer = {}));
//# sourceMappingURL=ValidateCloneProgrammer.js.map