import ts from "typescript";
export const decode_union_object = (checker) => (decoder) => (success) => (escaper) => (input, targets, explore) => ts.factory.createCallExpression(ts.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, iterate(escaper)(input, targets.map((obj) => ({
    type: "object",
    is: () => success(checker(input, obj, explore)),
    value: () => decoder(input, obj, explore),
})), `(${targets.map((t) => t.name).join(" | ")})`)), undefined, undefined);
const iterate = (escaper) => (input, unions, expected) => ts.factory.createBlock([
    ...unions.map((u) => ts.factory.createIfStatement(u.is(), ts.factory.createReturnStatement(u.value()))),
    escaper(input, expected),
], true);
//# sourceMappingURL=decode_union_object.js.map