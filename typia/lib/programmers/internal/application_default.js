export const application_default = (attribute) => (pred) => (caster) => {
    var _a, _b;
    const defaults = ((_a = attribute["x-typia-jsDocTags"]) !== null && _a !== void 0 ? _a : []).filter((tag) => tag.name === "default");
    for (const alias of defaults)
        if (((_b = alias.text) === null || _b === void 0 ? void 0 : _b.length) && pred(alias.text[0].text))
            return caster(alias.text[0].text);
    return undefined;
};
//# sourceMappingURL=application_default.js.map