import ts from "typescript";
import { get_comment_tags } from "./get_comment_tags";
export const check_custom = (type, alias) => (importer) => (jsDocTags) => (input) => get_comment_tags(true)(jsDocTags).map((tag) => {
    var _a, _b;
    return ({
        expected: `${alias !== null && alias !== void 0 ? alias : type} (@${tag.name}${((_a = tag.value) === null || _a === void 0 ? void 0 : _a.length) ? ` ${tag.value}` : ""})`,
        expression: ts.factory.createCallExpression(importer.use("is_custom"), undefined, [
            ts.factory.createStringLiteral(tag.name),
            ts.factory.createStringLiteral(type),
            ts.factory.createStringLiteral((_b = tag.value) !== null && _b !== void 0 ? _b : ""),
            input,
        ]),
    });
});
//# sourceMappingURL=check_custom.js.map