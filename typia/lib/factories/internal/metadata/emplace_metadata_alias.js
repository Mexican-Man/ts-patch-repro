import { ArrayUtil } from "../../../utils/ArrayUtil";
import { MetadataTagFactory } from "../../MetadataTagFactory";
import { explore_metadata } from "./explore_metadata";
export const emplace_metadata_alias = (checker) => (options) => (collection) => (type, nullable) => {
    const [alias, newbie, closure] = collection.emplaceAlias(checker, type, type.aliasSymbol);
    ArrayUtil.add(alias.nullables, nullable);
    if (newbie === false)
        return alias;
    const value = explore_metadata(checker)(options)(collection)(type, false, true);
    closure(value);
    alias.tags.push(...MetadataTagFactory.generate(value)(alias.jsDocTags)(() => alias.name));
    return alias;
};
//# sourceMappingURL=emplace_metadata_alias.js.map