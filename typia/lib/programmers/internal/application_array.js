import { application_schema } from "./application_schema";
export const application_array = (options) => (components) => (array) => (attribute) => {
    var _a;
    const schema = Object.assign(Object.assign({}, attribute), { type: "array", items: application_schema(options)(false)(components)(array.value)(attribute) });
    for (const tag of (_a = attribute["x-typia-metaTags"]) !== null && _a !== void 0 ? _a : [])
        if (tag.kind === "minItems")
            schema.minItems = tag.value;
        else if (tag.kind === "maxItems")
            schema.maxItems = tag.value;
    return schema;
};
//# sourceMappingURL=application_array.js.map