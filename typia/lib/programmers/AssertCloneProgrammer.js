import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { AssertProgrammer } from "./AssertProgrammer";
import { CloneProgrammer } from "./CloneProgrammer";
export var AssertCloneProgrammer;
(function (AssertCloneProgrammer) {
    AssertCloneProgrammer.write = (project) => (modulo) => (type, name) => ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("input", TypeFactory.keyword("any")),
    ], ts.factory.createTypeReferenceNode(`typia.Primitive<${name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type)}>`), undefined, ts.factory.createBlock([
        StatementFactory.constant("assert", AssertProgrammer.write(project)(modulo)(false)(type, name)),
        StatementFactory.constant("clone", CloneProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)(type, name)),
        ts.factory.createExpressionStatement(ts.factory.createCallExpression(ts.factory.createIdentifier("assert"), undefined, [ts.factory.createIdentifier("input")])),
        StatementFactory.constant("output", ts.factory.createCallExpression(ts.factory.createIdentifier("clone"), undefined, [ts.factory.createIdentifier("input")])),
        ts.factory.createReturnStatement(ts.factory.createIdentifier("output")),
    ]));
})(AssertCloneProgrammer || (AssertCloneProgrammer = {}));
//# sourceMappingURL=AssertCloneProgrammer.js.map