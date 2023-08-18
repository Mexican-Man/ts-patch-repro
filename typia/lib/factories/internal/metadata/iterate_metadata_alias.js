import { ArrayUtil } from "../../../utils/ArrayUtil";
import { emplace_metadata_alias } from "./emplace_metadata_alias";
export const iterate_metadata_alias = (checker) => (options) => (collection) => (meta, type) => {
    var _a;
    if (options.absorb !== false || type.aliasSymbol === undefined)
        return false;
    const node = (_a = type.aliasSymbol.declarations) === null || _a === void 0 ? void 0 : _a[0];
    if (node === undefined)
        return false;
    const alias = emplace_metadata_alias(checker)(options)(collection)(type, meta.nullable);
    ArrayUtil.add(meta.aliases, alias, (elem) => elem.name === alias.name);
    return true;
};
//# sourceMappingURL=iterate_metadata_alias.js.map