import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { AssertProgrammer } from "./AssertProgrammer";
import { StringifyProgrammer } from "./StringifyProgrammer";
export var AssertStringifyProgrammer;
(function (AssertStringifyProgrammer) {
    AssertStringifyProgrammer.write = (project) => (modulo) => (type, name) => ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("input", TypeFactory.keyword("any")),
    ], TypeFactory.keyword("string"), undefined, ts.factory.createBlock([
        StatementFactory.constant("assert", AssertProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: true }) }))(modulo)(false)(type, name)),
        StatementFactory.constant("stringify", StringifyProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)(type, name)),
        ts.factory.createReturnStatement(ts.factory.createCallExpression(ts.factory.createIdentifier("stringify"), undefined, [
            ts.factory.createCallExpression(ts.factory.createIdentifier("assert"), undefined, [ts.factory.createIdentifier("input")]),
        ])),
    ]));
})(AssertStringifyProgrammer || (AssertStringifyProgrammer = {}));
//# sourceMappingURL=AssertStringifyProgrammer.js.map