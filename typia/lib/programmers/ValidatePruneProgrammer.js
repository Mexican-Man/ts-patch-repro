import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { PruneProgrammer } from "./PruneProgrammer";
import { ValidateProgrammer } from "./ValidateProgrammer";
export var ValidatePruneProgrammer;
(function (ValidatePruneProgrammer) {
    ValidatePruneProgrammer.write = (project) => (modulo) => (type, name) => ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("input", TypeFactory.keyword("any")),
    ], ts.factory.createTypeReferenceNode(`typia.IValidation<${name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)}>`), undefined, ts.factory.createBlock([
        StatementFactory.constant("validate", ValidateProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: true }) }))(modulo)(false)(type, name)),
        StatementFactory.constant("prune", PruneProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)(type, name)),
        StatementFactory.constant("output", ts.factory.createCallExpression(ts.factory.createIdentifier("validate"), undefined, [ts.factory.createIdentifier("input")])),
        ts.factory.createIfStatement(ts.factory.createIdentifier("output.success"), ts.factory.createExpressionStatement(ts.factory.createCallExpression(ts.factory.createIdentifier("prune"), undefined, [ts.factory.createIdentifier("input")]))),
        ts.factory.createReturnStatement(ts.factory.createIdentifier("output")),
    ]));
})(ValidatePruneProgrammer || (ValidatePruneProgrammer = {}));
//# sourceMappingURL=ValidatePruneProgrammer.js.map