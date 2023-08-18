import ts from "typescript";
import { ExpressionFactory } from "../../factories/ExpressionFactory";
export const check_native = (type) => (input) => {
    const instanceOf = ExpressionFactory.isInstanceOf(type)(input);
    return ATOMIC_LIKE.has(type)
        ? ts.factory.createLogicalOr(ts.factory.createStrictEquality(ts.factory.createStringLiteral(type.toLowerCase()), ts.factory.createTypeOfExpression(input)), instanceOf)
        : instanceOf;
};
const ATOMIC_LIKE = new Set(["Boolean", "Number", "String"]);
//# sourceMappingURL=check_native.js.map