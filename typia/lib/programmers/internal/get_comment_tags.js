import { MetadataTagFactory } from "../../factories/MetadataTagFactory";
export const get_comment_tags = (excludeMetaTags) => (jsDocTags) => jsDocTags
    .filter((tag) => {
    var _a, _b, _c, _d;
    return tag.name !== "random" &&
        (!((_a = tag.text) === null || _a === void 0 ? void 0 : _a.length) ||
            (((_b = tag.text) === null || _b === void 0 ? void 0 : _b.length) === 1 &&
                ((_d = (_c = tag.text) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.kind) === "text")) &&
        (!excludeMetaTags ||
            MetadataTagFactory._PARSER[tag.name] === undefined);
})
    .map((tag) => {
    var _a, _b;
    return ({
        name: tag.name,
        value: (_b = (_a = tag.text) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.text,
    });
});
//# sourceMappingURL=get_comment_tags.js.map