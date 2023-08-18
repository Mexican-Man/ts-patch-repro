import { JSON_COMPONENTS_PREFIX } from "./JSON_SCHEMA_PREFIX";
export const application_native = (options) => (components) => (name) => (props) => {
    var _a, _b, _c;
    var _d;
    const key = options.purpose === "ajv"
        ? name
        : `${name}${props.nullable ? ".Nullable" : ""}`;
    if (((_a = components.schemas) === null || _a === void 0 ? void 0 : _a[key]) === undefined) {
        (_b = components.schemas) !== null && _b !== void 0 ? _b : (components.schemas = {});
        (_c = (_d = components.schemas)[key]) !== null && _c !== void 0 ? _c : (_d[key] = {
            type: "object",
            $id: options.purpose === "ajv"
                ? `${JSON_COMPONENTS_PREFIX}/objects/${key}`
                : undefined,
            properties: {},
            nullable: options.purpose === "swagger" ? props.nullable : undefined,
        });
    }
    return Object.assign(Object.assign({}, props.attribute), { $ref: `${JSON_COMPONENTS_PREFIX}/objects/${key}` });
};
//# sourceMappingURL=application_native.js.map