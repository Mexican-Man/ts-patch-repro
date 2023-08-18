import { application_default_string } from "./application_default_string";
export const application_string = (meta) => (attribute) => {
    var _a, _b, _c;
    const output = Object.assign(Object.assign({}, attribute), { type: "string" });
    const formatJsdocTag = (_a = attribute["x-typia-jsDocTags"]) === null || _a === void 0 ? void 0 : _a.find((tag) => tag.name === "format");
    if ((_b = formatJsdocTag === null || formatJsdocTag === void 0 ? void 0 : formatJsdocTag.text) === null || _b === void 0 ? void 0 : _b.length)
        output.format = formatJsdocTag === null || formatJsdocTag === void 0 ? void 0 : formatJsdocTag.text.map((t) => t.text).join(" ");
    for (const tag of (_c = attribute["x-typia-metaTags"]) !== null && _c !== void 0 ? _c : []) {
        if (tag.kind === "minLength")
            output.minLength = tag.value;
        else if (tag.kind === "maxLength")
            output.maxLength = tag.value;
        else if (tag.kind === "format")
            output.format = emendFormat(tag.value);
        else if (tag.kind === "pattern")
            output.pattern = tag.value;
    }
    output.default = application_default_string(meta)(attribute)(output);
    return output;
};
const emendFormat = (tag) => tag === "datetime" ? "date-time" : tag;
//# sourceMappingURL=application_string.js.map