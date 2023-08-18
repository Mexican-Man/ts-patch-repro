import { ExpressionFactory } from "../../factories/ExpressionFactory";
import { IdentifierFactory } from "../../factories/IdentifierFactory";
import { check_array_length } from "./check_array_length";
import { check_custom } from "./check_custom";
export const check_array = (importer) => (metaTags) => (jsDocTags) => (input) => ({
    expression: ExpressionFactory.isArray(input),
    tags: [
        ...check_array_length(metaTags)(IdentifierFactory.access(input)("length")),
        ...check_custom("array", "Array")(importer)(jsDocTags)(input),
    ],
});
//# sourceMappingURL=check_array.js.map