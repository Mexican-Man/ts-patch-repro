import { CommentFactory } from "../../factories/CommentFactory";
import { Metadata } from "../../metadata/Metadata";
import { PatternUtil } from "../../utils/PatternUtil";
import { JSON_COMPONENTS_PREFIX } from "./JSON_SCHEMA_PREFIX";
import { application_schema } from "./application_schema";
import { metadata_to_pattern } from "./metadata_to_pattern";
export const application_object = (options) => (components) => (obj) => (nullable) => {
    var _a, _b, _c, _d;
    const key = options.purpose === "ajv"
        ? obj.name
        : `${obj.name}${nullable ? ".Nullable" : ""}`;
    const $id = `${JSON_COMPONENTS_PREFIX}/schemas/${key}`;
    const output = { $ref: $id };
    if (((_a = components.schemas) === null || _a === void 0 ? void 0 : _a[key]) !== undefined)
        return output;
    (_b = components.schemas) !== null && _b !== void 0 ? _b : (components.schemas = {});
    components.schemas[key] = {};
    const properties = {};
    const extraMeta = {
        patternProperties: {},
        additionalProperties: undefined,
    };
    const required = [];
    for (const property of obj.properties) {
        if (property.value.functional === true &&
            property.value.nullable === false &&
            property.value.isRequired() === true &&
            property.value.size() === 0)
            continue;
        else if (property.jsDocTags.find((tag) => tag.name === "hidden"))
            continue;
        const key = property.key.getSoleLiteral();
        const schema = application_schema(options)(true)(components)(property.value)({
            deprecated: property.jsDocTags.some((tag) => tag.name === "deprecated") || undefined,
            title: (() => {
                var _a;
                const info = property.jsDocTags.find((tag) => tag.name === "title");
                return ((_a = info === null || info === void 0 ? void 0 : info.text) === null || _a === void 0 ? void 0 : _a.length)
                    ? CommentFactory.merge(info.text)
                    : undefined;
            })(),
            description: (_c = property.description) !== null && _c !== void 0 ? _c : undefined,
            "x-typia-metaTags": property.tags.length
                ? property.tags
                : undefined,
            "x-typia-jsDocTags": property.jsDocTags.length
                ? property.jsDocTags
                : undefined,
            "x-typia-required": property.value.required,
            "x-typia-optional": property.value.optional,
        });
        if (schema === null)
            continue;
        else if (key !== null) {
            properties[key] = schema;
            if (property.value.isRequired() === true)
                required.push(key);
        }
        else {
            const pattern = metadata_to_pattern(true)(property.key);
            if (pattern === PatternUtil.STRING)
                extraMeta.additionalProperties = [property.value, schema];
            else
                extraMeta.patternProperties[pattern] = [
                    property.value,
                    schema,
                ];
        }
    }
    const extraProps = {
        additionalProperties: (_d = extraMeta.additionalProperties) === null || _d === void 0 ? void 0 : _d[1],
        patternProperties: (() => {
            if (Object.keys(extraMeta.patternProperties).length === 0)
                return undefined;
            const output = {};
            for (const [key, value] of Object.entries(extraMeta.patternProperties))
                output[key] = value[1];
            return output;
        })(),
    };
    const schema = Object.assign({ $id: options.purpose === "ajv" ? $id : undefined, type: "object", properties, nullable: options.purpose === "swagger" ? nullable : undefined, required: required.length ? required : undefined, description: obj.description, "x-typia-jsDocTags": obj.jsDocTags }, (options.purpose === "ajv"
        ? extraProps
        : {
            "x-typia-additionalProperties": extraProps.additionalProperties,
            "x-typia-patternProperties": extraProps.patternProperties,
            additionalProperties: join(options)(components)(extraMeta),
        }));
    components.schemas[key] = schema;
    return output;
};
const join = (options) => (components) => (extra) => {
    var _a;
    const elements = Object.values(extra.patternProperties || {});
    if (extra.additionalProperties)
        elements.push(extra.additionalProperties);
    if (elements.length === 0)
        return undefined;
    else if (elements.length === 1)
        return elements[0][1];
    const meta = elements
        .map((tuple) => tuple[0])
        .reduce((x, y) => Metadata.merge(x, y));
    return ((_a = application_schema(options)(true)(components)(meta)({
        "x-typia-required": false,
    })) !== null && _a !== void 0 ? _a : undefined);
};
//# sourceMappingURL=application_object.js.map