import ts from "typescript";
import { IdentifierFactory } from "../../factories/IdentifierFactory";
import { TypeFactory } from "../../factories/TypeFactory";
export const check_everything = (array) => ts.factory.createCallExpression(IdentifierFactory.access(array)("every"), undefined, [
    ts.factory.createArrowFunction(undefined, undefined, [
        IdentifierFactory.parameter("flag", TypeFactory.keyword("boolean")),
    ], undefined, undefined, ts.factory.createIdentifier("flag")),
]);
//# sourceMappingURL=check_everything.js.map