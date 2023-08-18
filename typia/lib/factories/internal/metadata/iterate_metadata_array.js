import { ArrayUtil } from "../../../utils/ArrayUtil";
import { emplace_metadata_array } from "./emplace_metadata_array";
export const iterate_metadata_array = (checker) => (options) => (collection) => (meta, type) => {
    if (!checker.isArrayType(type))
        return false;
    const array = emplace_metadata_array(checker)(options)(collection)(type, meta.nullable);
    ArrayUtil.add(meta.arrays, array, (elem) => elem.name === array.name);
    return true;
};
//# sourceMappingURL=iterate_metadata_array.js.map