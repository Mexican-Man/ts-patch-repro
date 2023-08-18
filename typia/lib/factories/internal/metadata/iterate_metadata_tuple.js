import { ArrayUtil } from "../../../utils/ArrayUtil";
import { emplace_metadata_tuple } from "./emplace_metadata_tuple";
export const iterate_metadata_tuple = (checker) => (options) => (collection) => (meta, type) => {
    if (!checker.isTupleType(type))
        return false;
    const tuple = emplace_metadata_tuple(checker)(options)(collection)(type, meta.nullable);
    ArrayUtil.add(meta.tuples, tuple, (elem) => elem.name === tuple.name);
    return true;
};
//# sourceMappingURL=iterate_metadata_tuple.js.map