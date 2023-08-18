import ts from "typescript";
import { MetadataHelper } from "./MetadataHelper";
import { explore_metadata } from "./explore_metadata";
export const iterate_metadata_template = (checker) => (options) => (collection) => (meta, type) => {
    const filter = (flag) => (type.getFlags() & flag) !== 0;
    if (!filter(ts.TypeFlags.TemplateLiteral))
        return false;
    const template = type;
    const row = [];
    template.texts.forEach((text, i) => {
        if (text !== "")
            row.push(MetadataHelper.literal_to_metadata(text));
        const binded = template.types[i];
        if (binded)
            row.push(explore_metadata(checker)(options)(collection)(binded, false));
    });
    meta.templates.push(row);
    return true;
};
//# sourceMappingURL=iterate_metadata_template.js.map