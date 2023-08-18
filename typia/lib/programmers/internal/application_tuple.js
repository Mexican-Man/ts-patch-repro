import { Metadata } from "../../metadata/Metadata";
import { application_schema } from "./application_schema";
export const application_tuple = (options) => (components) => (tuple) => (attribute) => {
    var _a, _b, _c;
    const schema = Object.assign(Object.assign({ type: "array", items: tuple.elements.map((meta, i) => {
            var _a;
            return application_schema(options)(false)(components)((_a = meta.rest) !== null && _a !== void 0 ? _a : meta)(Object.assign(Object.assign({}, attribute), { "x-typia-rest": i === tuple.elements.length - 1 && meta.rest !== null, "x-typia-required": meta.required, "x-typia-optional": meta.optional }));
        }) }, attribute), { minItems: !!((_a = tuple.elements.at(-1)) === null || _a === void 0 ? void 0 : _a.rest)
            ? tuple.elements.length - 1
            : tuple.elements.filter((x) => !x.optional).length, maxItems: !!((_b = tuple.elements.at(-1)) === null || _b === void 0 ? void 0 : _b.rest)
            ? undefined
            : tuple.elements.length });
    if (options.purpose === "ajv")
        if (tuple.elements.length === 0)
            return schema;
        else if (!((_c = tuple.elements.at(-1)) === null || _c === void 0 ? void 0 : _c.rest))
            return schema;
    const wrapper = Object.assign(Object.assign({}, schema), { items: application_schema(options)(false)(components)(tuple.elements.reduce((x, y) => { var _a, _b; return Metadata.merge((_a = x.rest) !== null && _a !== void 0 ? _a : x, (_b = y.rest) !== null && _b !== void 0 ? _b : y); }, Metadata.initialize()))(tuple.recursive ? {} : attribute), "x-typia-tuple": schema, minItems: schema.minItems, maxItems: schema.maxItems });
    return wrapper;
};
//# sourceMappingURL=application_tuple.js.map