import ts from "typescript";
import { IdentifierFactory } from "./IdentifierFactory";
export var LiteralFactory;
(function (LiteralFactory) {
    LiteralFactory.generate = (input) => {
        if (input === null)
            return ts.factory.createNull();
        else if (ts.isIdentifier(input))
            return input;
        else if (input instanceof Array)
            return generate_array(input);
        else if (typeof input === "object")
            return generate_object(input);
        else if (typeof input === "string")
            return generate_string(input);
        else if (typeof input === "boolean")
            return generate_value(input);
        else if (typeof input === "number")
            return generate_value(input);
        else if (typeof input === "bigint")
            return generate_value(input);
        else
            throw new Error("Unknown type.");
    };
    const generate_object = (obj) => ts.factory.createObjectLiteralExpression(Object.entries(obj)
        .filter((tuple) => tuple[1] !== undefined)
        .map(([key, value]) => ts.factory.createPropertyAssignment(IdentifierFactory.identifier(key), LiteralFactory.generate(value))), true);
    const generate_array = (array) => ts.factory.createArrayLiteralExpression(array.map(LiteralFactory.generate), true);
    const generate_value = (value) => ts.factory.createIdentifier(value.toString());
    const generate_string = (value) => ts.factory.createStringLiteral(value);
})(LiteralFactory || (LiteralFactory = {}));
//# sourceMappingURL=LiteralFactory.js.map