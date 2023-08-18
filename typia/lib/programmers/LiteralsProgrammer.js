import ts from "typescript";
import { MetadataCollection } from "../factories/MetadataCollection";
import { MetadataFactory } from "../factories/MetadataFactory";
import { ArrayUtil } from "../utils/ArrayUtil";
export var LiteralsProgrammer;
(function (LiteralsProgrammer) {
    LiteralsProgrammer.write = (project) => (type) => {
        const meta = MetadataFactory.analyze(project.checker)({
            resolve: true,
            constant: true,
            absorb: true,
            validate: (meta) => {
                const length = meta.constants
                    .map((c) => c.values.length)
                    .reduce((a, b) => a + b, 0) +
                    meta.atomics.filter((type) => type === "boolean").length;
                if (0 === length)
                    throw new Error(ErrorMessages.NO);
                else if (meta.size() !== length)
                    throw new Error(ErrorMessages.ONLY);
            },
        })(new MetadataCollection())(type);
        const values = new Set([
            ...ArrayUtil.flat(meta.constants.map((c) => c.values)),
            ...(meta.atomics.filter((type) => type === "boolean").length
                ? [true, false]
                : []),
            ...(meta.nullable ? [null] : []),
        ]);
        return ts.factory.createAsExpression(ts.factory.createArrayLiteralExpression([...values].map((v) => v === null
            ? ts.factory.createNull()
            : typeof v === "boolean"
                ? v
                    ? ts.factory.createTrue()
                    : ts.factory.createFalse()
                : typeof v === "number"
                    ? ts.factory.createNumericLiteral(v)
                    : typeof v === "bigint"
                        ? ts.factory.createBigIntLiteral(v.toString())
                        : ts.factory.createStringLiteral(v)), true), ts.factory.createTypeReferenceNode("const"));
    };
})(LiteralsProgrammer || (LiteralsProgrammer = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["NO"] = "Error on typia.literals(): no literal type found.";
    ErrorMessages["ONLY"] = "Error on typia.literals(): only literal type allowed.";
})(ErrorMessages || (ErrorMessages = {}));
//# sourceMappingURL=LiteralsProgrammer.js.map