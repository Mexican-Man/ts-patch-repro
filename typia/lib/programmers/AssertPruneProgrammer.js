import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { AssertProgrammer } from "./AssertProgrammer";
import { PruneProgrammer } from "./PruneProgrammer";
export var AssertPruneProgrammer;
(function (AssertPruneProgrammer) {
    AssertPruneProgrammer.write = (project) => (modulo) => (type, name) => ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("input", TypeFactory.keyword("any")),
    ], ts.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)), undefined, ts.factory.createBlock([
        StatementFactory.constant("assert", AssertProgrammer.write(project)(modulo)(false)(type, name)),
        StatementFactory.constant("prune", PruneProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)(type, name)),
        ts.factory.createExpressionStatement(ts.factory.createCallExpression(ts.factory.createIdentifier("assert"), undefined, [ts.factory.createIdentifier("input")])),
        ts.factory.createExpressionStatement(ts.factory.createCallExpression(ts.factory.createIdentifier("prune"), undefined, [ts.factory.createIdentifier("input")])),
        ts.factory.createReturnStatement(ts.factory.createIdentifier("input")),
    ]));
})(AssertPruneProgrammer || (AssertPruneProgrammer = {}));
//# sourceMappingURL=AssertPruneProgrammer.js.map