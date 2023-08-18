import { CommentFactory } from "../../factories/CommentFactory";
import { JSON_COMPONENTS_PREFIX } from "./JSON_SCHEMA_PREFIX";
import { application_object } from "./application_object";
import { application_schema } from "./application_schema";
export const application_alias = (options) => (blockNever) => (components) => (alias) => (nullable) => {
    var _a, _b, _c, _d;
    if (alias.value.size() === 1 && alias.value.objects.length === 1)
        return application_object(options)(components)(alias.value.objects[0])(nullable);
    const key = options.purpose === "ajv"
        ? alias.name
        : `${alias.name}${nullable ? ".Nullable" : ""}`;
    const $id = `${JSON_COMPONENTS_PREFIX}/schemas/${key}`;
    if (((_a = components.schemas) === null || _a === void 0 ? void 0 : _a[key]) === undefined) {
        (_b = components.schemas) !== null && _b !== void 0 ? _b : (components.schemas = {});
        components.schemas[key] = {
            $id: key,
        };
        const schema = application_schema(options)(blockNever)(components)(alias.value)({
            deprecated: alias.jsDocTags.some((tag) => tag.name === "deprecated") ||
                undefined,
            title: (() => {
                var _a;
                const info = alias.jsDocTags.find((tag) => tag.name === "title");
                return ((_a = info === null || info === void 0 ? void 0 : info.text) === null || _a === void 0 ? void 0 : _a.length)
                    ? CommentFactory.merge(info.text)
                    : undefined;
            })(),
            description: (_c = alias.description) !== null && _c !== void 0 ? _c : undefined,
            "x-typia-metaTags": alias.tags.length ? alias.tags : undefined,
            "x-typia-jsDocTags": alias.jsDocTags.length
                ? alias.jsDocTags
                : undefined,
        });
        (_d = components.schemas) !== null && _d !== void 0 ? _d : (components.schemas = {});
        components.schemas[key] = Object.assign({ $id: options.purpose === "ajv" ? $id : undefined, $recursiveAnchor: (options.purpose === "ajv" && alias.recursive) || undefined }, schema);
    }
    return { $ref: $id };
};
//# sourceMappingURL=application_alias.js.map