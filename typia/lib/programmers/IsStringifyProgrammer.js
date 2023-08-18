import ts from "typescript";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { IsProgrammer } from "./IsProgrammer";
import { StringifyProgrammer } from "./StringifyProgrammer";
export var IsStringifyProgrammer;
(function (IsStringifyProgrammer) {
    IsStringifyProgrammer.write = (project) => (modulo) => (type, name) => ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("input", ts.factory.createTypeReferenceNode(name !== null && name !== void 0 ? name : TypeFactory.getFullName(project.checker)(type))),
    ], ts.factory.createUnionTypeNode([
        TypeFactory.keyword("string"),
        ts.factory.createLiteralTypeNode(ts.factory.createNull()),
    ]), undefined, ts.factory.createBlock([
        StatementFactory.constant("is", IsProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: true }) }))(modulo)(false)(type, name)),
        StatementFactory.constant("stringify", StringifyProgrammer.write(Object.assign(Object.assign({}, project), { options: Object.assign(Object.assign({}, project.options), { functional: false, numeric: false }) }))(modulo)(type, name)),
        ts.factory.createReturnStatement(ts.factory.createConditionalExpression(ts.factory.createCallExpression(ts.factory.createIdentifier("is"), undefined, [ts.factory.createIdentifier("input")]), undefined, ts.factory.createCallExpression(ts.factory.createIdentifier("stringify"), undefined, [ts.factory.createIdentifier("input")]), undefined, ts.factory.createNull())),
    ]));
})(IsStringifyProgrammer || (IsStringifyProgrammer = {}));
//# sourceMappingURL=IsStringifyProgrammer.js.map