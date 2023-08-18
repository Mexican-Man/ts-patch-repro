import ts from "typescript";
import { check_custom } from "./check_custom";
import { check_string_tags } from "./check_string_tags";
import { template_to_pattern } from "./template_to_pattern";
export const check_template = (importer) => (metaTags) => (jsDocTags) => (templates) => (input) => {
    const conditions = [
        ts.factory.createStrictEquality(ts.factory.createStringLiteral("string"), ts.factory.createTypeOfExpression(input)),
    ];
    const internal = templates.map((tpl) => ts.factory.createCallExpression(ts.factory.createIdentifier(`RegExp(/${template_to_pattern(true)(tpl)}/).test`), undefined, [input]));
    conditions.push(internal.length === 1
        ? internal[0]
        : internal.reduce((x, y) => ts.factory.createLogicalOr(x, y)));
    return {
        expression: conditions.reduce((x, y) => ts.factory.createLogicalAnd(x, y)),
        tags: [
            ...check_string_tags(importer)(metaTags)(input),
            ...check_custom("string")(importer)(jsDocTags)(input),
        ],
    };
};
//# sourceMappingURL=check_template.js.map