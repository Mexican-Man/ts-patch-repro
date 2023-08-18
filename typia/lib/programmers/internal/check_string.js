import ts from "typescript";
import { check_custom } from "./check_custom";
import { check_string_tags } from "./check_string_tags";
export const check_string = (importer) => (metaTags) => (jsDocTags) => (input) => ({
    expression: ts.factory.createStrictEquality(ts.factory.createStringLiteral("string"), ts.factory.createTypeOfExpression(input)),
    tags: [
        ...check_string_tags(importer)(metaTags)(input),
        ...check_custom("string")(importer)(jsDocTags)(input),
    ],
});
//# sourceMappingURL=check_string.js.map